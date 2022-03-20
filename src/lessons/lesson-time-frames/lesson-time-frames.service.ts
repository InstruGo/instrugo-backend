import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateLessonTimeFrameDto } from '../dto/lesson-time-frames/update-lesson-time-frame.dto';
import { LessonTimeFrame } from '../entities/lesson-time-frame.entity';
import { LessonTimeFrameRepository } from './lesson-time-frames.repository';
import { CreateLessonTimeFrameDto } from '../dto/lesson-time-frames/create-lesson-time-frame.dto';

@Injectable()
export class LessonTimeFramesService {
  constructor(
    @InjectRepository(LessonTimeFrameRepository)
    private lessonTimeFrameRepository: LessonTimeFrameRepository
  ) {}

  getLessonTimeFrames(): Promise<LessonTimeFrame[]> {
    return this.lessonTimeFrameRepository.getLessonTimeFrames();
  }

  async getLessonTimeFrame(id: number): Promise<LessonTimeFrame> {
    const lessonTimeFrame = await this.lessonTimeFrameRepository.findOne(id);

    if (!lessonTimeFrame) {
      throw new NotFoundException(
        'Specified lesson time frame does not exist.'
      );
    }
    return lessonTimeFrame;
  }

  async createLessonTimeFrame(
    createLessonTimeFrameDto: CreateLessonTimeFrameDto
  ): Promise<LessonTimeFrame> {
    return this.lessonTimeFrameRepository.createLessonTimeFrame(
      createLessonTimeFrameDto
    );
  }

  async updateLessonTimeFrame(
    id: number,
    updateLessonTimeFrameDto: UpdateLessonTimeFrameDto
  ): Promise<LessonTimeFrame> {
    const lessonTimeFrame = await this.lessonTimeFrameRepository.findOne(id);

    if (!lessonTimeFrame) {
      throw new NotFoundException(
        'Specified lesson time frame does not exist.'
      );
    }

    return this.lessonTimeFrameRepository.updateLessonTimeFrame(
      lessonTimeFrame,
      updateLessonTimeFrameDto
    );
  }

  async deleteLessonTimeFrame(id: number): Promise<void> {
    const result = await this.lessonTimeFrameRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Lesson time frame with ID ${id} not found.`);
    }
  }
}
