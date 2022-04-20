import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LessonRepository } from '../lessons/lesson.repository';
import { FilterTutorResponseDto } from './dto/filter-tutor-response.dto';
import { CreateTutorResponseDto } from './dto/create-tutor-response.dto';
import { UpdateTutorResponseDto } from './dto/update-tutor-response.dto';
import { TutorResponse } from './entities/tutor-response.entity';
import { TutorResponseRepository } from './tutor-responses.repository';
import { TimeFrameRepository } from '../time-frames/time-frames.repository';
import { TimeFrame } from '../time-frames/entities/time-frame.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class TutorResponsesService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    @InjectRepository(TutorResponseRepository)
    private tutorResponseRepository: TutorResponseRepository,
    @InjectRepository(TimeFrameRepository)
    private timeFrameRepository: TimeFrameRepository
  ) {}

  async getTutorResponses(
    user: User,
    filterTutorResponseDto: FilterTutorResponseDto
  ): Promise<TutorResponse[]> {
    return this.tutorResponseRepository.getTutorResponses(
      user,
      filterTutorResponseDto
    );
  }

  async getTutorResponse(user: User, id: number): Promise<TutorResponse> {
    const response = await this.tutorResponseRepository.findOne(id);

    if (!response) {
      throw new NotFoundException('Specified response does not exist.');
    }

    if (response.tutor.id !== user.id) {
      throw new ForbiddenException();
    }

    return response;
  }

  async createTutorResponse(
    tutor: User,
    lessonId: number,
    createTutorResponseDto: CreateTutorResponseDto
  ): Promise<TutorResponse> {
    const lesson = await this.lessonRepository.findOne(lessonId);

    if (!lesson) {
      throw new NotFoundException('This lesson does not exist.');
    }

    if (!lesson.student) {
      throw new NotFoundException('This lesson does not have an owner.');
    }

    if (lesson.student.id === tutor.id) {
      throw new BadRequestException('You cannot respond to your own lessons!');
    }

    if (!lesson.containsTimeFrame(createTutorResponseDto.tutorTimeFrame)) {
      throw new BadRequestException(
        'Sent time frame is not contained in this lesson.'
      );
    }

    const tutorResponseTimeFrame =
      await this.timeFrameRepository.createTimeFrame(
        createTutorResponseDto.tutorTimeFrame
      );

    return this.tutorResponseRepository.createTutorResponse(
      tutor,
      lesson,
      tutorResponseTimeFrame,
      createTutorResponseDto
    );
  }

  async updateTutorResponse(
    user: User,
    lessonId: number,
    updateTutorResponseDto: UpdateTutorResponseDto
  ): Promise<TutorResponse> {
    const response = await this.tutorResponseRepository.findOne({
      where: {
        tutor: { id: user.id },
        lesson: { id: lessonId },
      },
      relations: ['user', 'lesson'],
    });

    if (!response) {
      throw new NotFoundException('Specified response does not exist.');
    }

    if (response.tutor.id !== user.id) {
      throw new ForbiddenException();
    }

    const { tutorTimeFrame } = updateTutorResponseDto;

    const lesson = await this.lessonRepository.findOne(lessonId);

    if (!lesson) {
      throw new NotFoundException();
    }

    if (!lesson.containsTimeFrame(tutorTimeFrame)) {
      throw new BadRequestException(
        'Sent time frame is not contained in the lesson.'
      );
    }

    let tutorResponseTimeFrame: TimeFrame = null;
    if (tutorTimeFrame) {
      await this.timeFrameRepository.deleteTimeFrame(
        response.tutorResponseTimeFrame
      );

      tutorResponseTimeFrame = await this.timeFrameRepository.createTimeFrame(
        tutorTimeFrame
      );
    }

    return this.tutorResponseRepository.updateTutorResponse(
      response,
      tutorResponseTimeFrame,
      updateTutorResponseDto
    );
  }

  async deleteTutorResponse(user: User, id: number): Promise<void> {
    const response = await this.tutorResponseRepository.findOne(id);

    if (!response) {
      return;
    }

    if (response.tutor.id !== user.id) {
      throw new ForbiddenException();
    }

    await response.remove();
  }
}
