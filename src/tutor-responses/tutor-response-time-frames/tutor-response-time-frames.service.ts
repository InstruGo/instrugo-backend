import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateTutorResponseTimeFrameDto } from '../dto/update-tutor-response-time-frame.dto';
import { TutorResponseTimeFrame } from '../entities/tutor-response-time-frame.entity';
import { TutorResponseTimeFrameRepository } from './tutor-response-time-frames.repository';
import { CreateTutorResponseTimeFrameDto } from '../dto/create-tutor-response-time-frame.dto';

@Injectable()
export class TutorResponseTimeFramesService {
  constructor(
    @InjectRepository(TutorResponseTimeFrameRepository)
    private tutorResponseTimeFrameRepository: TutorResponseTimeFrameRepository
  ) {}

  getTutorResponseTimeFrames(): Promise<TutorResponseTimeFrame[]> {
    return this.tutorResponseTimeFrameRepository.getTutorResponseTimeFrames();
  }

  async getTutorResponseTimeFrame(id: number): Promise<TutorResponseTimeFrame> {
    const tutorResponseTimeFrame =
      await this.tutorResponseTimeFrameRepository.findOne(id);

    if (!tutorResponseTimeFrame) {
      throw new NotFoundException('Specified tutor time frame does not exist.');
    }
    return tutorResponseTimeFrame;
  }

  async createTutorResponseTimeFrame(
    createTutorResponseTimeFrameDto: CreateTutorResponseTimeFrameDto
  ): Promise<TutorResponseTimeFrame> {
    return this.tutorResponseTimeFrameRepository.createTutorResponseTimeFrame(
      createTutorResponseTimeFrameDto
    );
  }

  async updateTutorResponseTimeFrame(
    id: number,
    updateTutorResponseTimeFrameDto: UpdateTutorResponseTimeFrameDto
  ): Promise<TutorResponseTimeFrame> {
    const tutorResponseTimeFrame =
      await this.tutorResponseTimeFrameRepository.findOne(id);

    if (!tutorResponseTimeFrame) {
      throw new NotFoundException('Specified tutor time frame does not exist.');
    }

    return this.tutorResponseTimeFrameRepository.updateTutorResponseTimeFrame(
      tutorResponseTimeFrame,
      updateTutorResponseTimeFrameDto
    );
  }

  async deleteTutorResponseTimeFrame(id: number): Promise<void> {
    const result = await this.tutorResponseTimeFrameRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(
        `Tutor response time frame with ID ${id} not found.`
      );
    }
  }
}
