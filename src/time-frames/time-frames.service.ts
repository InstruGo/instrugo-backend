import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeFrameRepository } from './time-frames.repository';
import { TimeFrame } from './entities/time-frame.entity';
import { CreateTimeFrameDto } from './dto/create-lesson-time-frame.dto';
import { UpdateTimeFrameDto } from './dto/update-lesson-time-frame.dto';

@Injectable()
export class TimeFramesService {
  constructor(
    @InjectRepository(TimeFrameRepository)
    private timeFrameRepository: TimeFrameRepository
  ) {}

  getTimeFrames(): Promise<TimeFrame[]> {
    return this.timeFrameRepository.getTimeFrames();
  }

  async getTimeFrame(id: number): Promise<TimeFrame> {
    const lessonTimeFrame = await this.timeFrameRepository.findOne(id);

    if (!lessonTimeFrame) {
      throw new NotFoundException('Specified time frame does not exist.');
    }
    return lessonTimeFrame;
  }

  async createTimeFrame(
    createLessonTimeFrameDto: CreateTimeFrameDto
  ): Promise<TimeFrame> {
    return this.timeFrameRepository.createTimeFrame(createLessonTimeFrameDto);
  }

  async updateTimeFrame(
    id: number,
    updateLessonTimeFrameDto: UpdateTimeFrameDto
  ): Promise<TimeFrame> {
    const lessonTimeFrame = await this.timeFrameRepository.findOne(id);

    if (!lessonTimeFrame) {
      throw new NotFoundException(
        'Specified lesson time frame does not exist.'
      );
    }

    return this.timeFrameRepository.updateTimeFrame(
      lessonTimeFrame,
      updateLessonTimeFrameDto
    );
  }

  async deleteTimeFrame(id: number): Promise<void> {
    const result = await this.timeFrameRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Lesson time frame with ID ${id} not found.`);
    }
  }
}
