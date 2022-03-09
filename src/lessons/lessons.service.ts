import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FilterLessonDto } from './dto/lesson-filter.dto';
import { Lesson } from './entities/lesson.entity';
import { LessonsRepository } from './lessons.repository';
import { UserRepository } from '../auth/user.repository';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonsRepository)
    private lessonsRepository: LessonsRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>
  ) {}

  findAll(filterLessonDto: FilterLessonDto): Promise<Lesson[]> {
    return this.lessonsRepository.getLessons(filterLessonDto);
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOne(id);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }
    return lesson;
  }

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const owner = await this.userRepository.findOne(createLessonDto.userId);
    const subject = await this.subjectRepository.findOne(
      createLessonDto.subjectId
    );

    return this.lessonsRepository.createLesson(createLessonDto, owner, subject);
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }

    const subject = await this.subjectRepository.findOne(
      updateLessonDto.subjectId
    );

    return this.lessonsRepository.updateLesson(
      lesson,
      updateLessonDto,
      subject
    );
  }

  async delete(id: number): Promise<void> {
    const result = await this.lessonsRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Lesson with ID ${id} not found.`);
    }
  }
}
