import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LessonRepository } from './lesson.repository';
import { UserRepository } from '../auth/user.repository';
import { Lesson } from './entities/lesson.entity';
import { SubjectRepository } from './subjects/subject.repository';
import { CreateLessonDto } from './dto/lessons/create-lesson.dto';
import { FilterLessonDto } from './dto/lessons/filter-lesson.dto';
import { UpdateLessonDto } from './dto/lessons/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository
  ) {}

  getLessons(filterLessonDto: FilterLessonDto): Promise<Lesson[]> {
    return this.lessonRepository.getLessons(filterLessonDto);
  }

  async getLesson(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne(id);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }
    return lesson;
  }

  async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const owner = await this.userRepository.findOne(createLessonDto.userId);
    const subject = await this.subjectRepository.findOne(
      createLessonDto.subjectId
    );

    return this.lessonRepository.createLesson(createLessonDto, owner, subject);
  }

  async updateLesson(
    id: number,
    updateLessonDto: UpdateLessonDto
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne(id);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }

    const subject = await this.subjectRepository.findOne(
      updateLessonDto.subjectId
    );

    return this.lessonRepository.updateLesson(lesson, updateLessonDto, subject);
  }

  async deleteLesson(id: number): Promise<void> {
    const result = await this.lessonRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Lesson with ID ${id} not found.`);
    }
  }
}
