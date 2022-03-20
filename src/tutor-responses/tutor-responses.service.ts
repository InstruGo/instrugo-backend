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
import { TutorResponseTimeFrameRepository } from './tutor-response-time-frames/tutor-response-time-frames.repository';
import { TutorResponseTimeFrame } from './entities/tutor-response-time-frame.entity';
@Injectable()
export class TutorResponsesService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(TutorResponseRepository)
    private tutorResponseRepository: TutorResponseRepository,
    @InjectRepository(TutorResponseTimeFrameRepository)
    private tutorResponseTimeFrameRepository: TutorResponseTimeFrameRepository
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

    if (!tutor.tutor) {
      throw new BadRequestException('Only tutors can make responses.');
    }

    const lesson = await this.lessonRepository.findOne(
      createTutorResponseDto.lessonId
    );

    if (!lesson) {
      throw new NotFoundException('This lesson does not exist.');
    }

    if (!lesson.owner) {
      throw new NotFoundException('This lesson does not have an owner.');
    }

    if (lesson.owner.id === tutor.id) {
      throw new BadRequestException('You cannot respond to Your own lessons!');
    }

    const tutorResponseTimeFrames =
      await this.tutorResponseTimeFrameRepository.createTutorResponseTimeFrames(
        createTutorResponseDto.tutorTimeFrames
      );

    return this.tutorResponseRepository.createTutorResponse(
      createTutorResponseDto,
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

    let tutorResponseTimeFramesArr: TutorResponseTimeFrame[] = [];
    if (tutorTimeFrames) {
      await this.tutorResponseTimeFrameRepository.deleteTutorResponseTimeFrames(
        response.tutorResponseTimeFrames
      );

      tutorResponseTimeFramesArr =
        await this.tutorResponseTimeFrameRepository.createTutorResponseTimeFrames(
          tutorTimeFrames
        );
    }

    return this.tutorResponseRepository.updateTutorResponse(
      response,
      updateTutorResponseDto,
      tutorResponseTimeFramesArr
    );
  }

  async deleteTutorResponse(id: number): Promise<void> {
    const result = await this.tutorResponseRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(
        `Specified response with Id ${id} does not exist.`
      );
    }
  }
}
