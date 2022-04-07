import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LessonRepository } from '../lessons/lesson.repository';
import { UserRepository } from '../auth/user.repository';
import { FilterTutorResponseDto } from './dto/filter-tutor-response.dto';
import { CreateTutorResponseDto } from './dto/create-tutor-response.dto';
import { UpdateTutorResponseDto } from './dto/update-tutor-response.dto';
import { TutorResponse } from './entities/tutor-response.entity';
import { TutorResponseRepository } from './tutor-responses.repository';
import { UserRole } from 'src/auth/entities/user.role.enum';
import { TimeFrameRepository } from '../time-frames/time-frames.repository';
import { TimeFrame } from '../time-frames/entities/time-frame.entity';

@Injectable()
export class TutorResponsesService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(TutorResponseRepository)
    private tutorResponseRepository: TutorResponseRepository,
    @InjectRepository(TimeFrameRepository)
    private timeFrameRepository: TimeFrameRepository
  ) {}

  async createTutorResponse(
    createTutorResponseDto: CreateTutorResponseDto
  ): Promise<TutorResponse> {
    const tutor = await this.userRepository.findOne(
      createTutorResponseDto.tutorId
    );
    if (!tutor) {
      throw new NotFoundException('This tutor does not exist.');
    }

    if (tutor.role !== UserRole.TUTOR) {
      throw new BadRequestException('Only tutors can make responses.');
    }

    const lesson = await this.lessonRepository.findOne(
      createTutorResponseDto.lessonId
    );

    if (!lesson) {
      throw new NotFoundException('This lesson does not exist.');
    }

    if (!lesson.student) {
      throw new NotFoundException('This lesson does not have an owner.');
    }

    if (lesson.student.id === tutor.id) {
      throw new BadRequestException('You cannot respond to your own lessons!');
    }

    const tutorResponseTimeFrames =
      await this.timeFrameRepository.createTimeFrames(
        createTutorResponseDto.tutorTimeFrames
      );

    return this.tutorResponseRepository.createTutorResponse(
      tutor,
      lesson,
      tutorResponseTimeFrames
    );
  }

  async getTutorResponses(
    filterTutorResponseDto: FilterTutorResponseDto
  ): Promise<TutorResponse[]> {
    return this.tutorResponseRepository.getTutorResponses(
      filterTutorResponseDto
    );
  }

  async getTutorResponse(id: number): Promise<TutorResponse> {
    const response = await this.tutorResponseRepository.findOne(id);
    if (!response) {
      throw new NotFoundException('Specified response does not exist.');
    }
    return response;
  }

  async updateTutorResponse(
    id: number,
    updateTutorResponseDto: UpdateTutorResponseDto
  ): Promise<TutorResponse> {
    const response = await this.tutorResponseRepository.findOne(id);

    if (!response) {
      throw new NotFoundException('Specified response does not exist.');
    }

    const { tutorTimeFrames } = updateTutorResponseDto;

    let tutorResponseTimeFramesArr: TimeFrame[] = [];
    if (tutorTimeFrames) {
      await this.timeFrameRepository.deleteTimeFrames(
        response.tutorResponseTimeFrames
      );

      tutorResponseTimeFramesArr =
        await this.timeFrameRepository.createTimeFrames(tutorTimeFrames);
    }

    return this.tutorResponseRepository.updateTutorResponse(
      response,
      tutorResponseTimeFramesArr
    );
  }

  async deleteTutorResponse(id: number): Promise<void> {
    const result = await this.tutorResponseRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Response with id ${id} does not exist.`);
    }
  }
}
