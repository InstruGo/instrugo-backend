import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FilterLessonDto } from './dto/lesson-filter.dto';
import { Lesson } from './entities/lesson.entity';
import { LessonsRepository } from './lessons.repository';

@Injectable()
export class LessonsService {

  constructor(
		@InjectRepository(LessonsRepository)
		private lessonsRepository: LessonsRepository,
	) {}

  create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonsRepository.createLesson(createLessonDto);
  }

  findAll(filterLessonDto: FilterLessonDto): Promise<Lesson[]>{
    return this.lessonsRepository.getLessons(filterLessonDto);
  }

  findOne(id: number): Promise<Lesson> {
    return this.lessonsRepository.findOne(id);;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);

		if (!lesson) {
			throw new NotFoundException('Specified player does not exist.');
		}
    return this.lessonsRepository.updateLesson(lesson, updateLessonDto);
  }

  async remove(id: number): Promise<void> {
    const result = await this.lessonsRepository.delete(id);
		if (!result.affected) {
			throw new NotFoundException(`Lesson with ID ${id} not found.`);
		};
  }
}
