import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LessonRepository } from '../lessons/lesson.repository';
import { UserRepository } from '../auth/user.repository';
import { FilterTutorResponseDto } from './dto/filter-tutor-response.dto';
import { CreateTutorResponseDto } from './dto/create-tutor-response.dto';
import { UpdateTutorResponseDto } from './dto/update-tutor-response.dto';
import { TutorResponse } from './entities/tutor-response.entity';
import { TutorResponseRepository } from './tutor-responses.repository';

@Injectable()
export class TutorResponsesService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(TutorResponseRepository)
    private tutorResponseRepository: TutorResponseRepository
  ) {}

  async createTutorResponse(
    createTutorResponseDto: CreateTutorResponseDto
  ): Promise<TutorResponse> {
    const tutor = await this.userRepository.findOne(
      createTutorResponseDto.tutorId
    );
    const lesson = await this.lessonRepository.findOne(
      createTutorResponseDto.lessonId
    );
    return this.tutorResponseRepository.createTutorResponse(
      createTutorResponseDto,
      tutor,
      lesson
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
    return this.tutorResponseRepository.updateTutorResponse(
      response,
      updateTutorResponseDto
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
