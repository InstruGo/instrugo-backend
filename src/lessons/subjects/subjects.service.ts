import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Subject } from '../entities/subject.entity';
import { SubjectRepository } from './subject.repository';
import { CreateSubjectDto } from '../dto/subjects/create-subject.dto';
import { FilterSubjectDto } from '../dto/subjects/filter-subject.dto';
import { UpdateSubjectDto } from '../dto/subjects/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository
  ) {}

  getSubjects(filterSubjectDto: FilterSubjectDto): Promise<Subject[]> {
    return this.subjectRepository.getSubjects(filterSubjectDto);
  }

  async getSubject(id: number): Promise<Subject> {
    const lesson = await this.subjectRepository.findOne(id);

    if (!lesson) {
      throw new NotFoundException('Specified subject does not exist.');
    }

    return lesson;
  }

  async createSubject(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectRepository.createSubject(createSubjectDto);
  }

  async updateSubject(
    id: number,
    updateLessonDto: UpdateSubjectDto
  ): Promise<Subject> {
    const subject = await this.subjectRepository.findOne(id);

    if (!subject) {
      throw new NotFoundException('Specified subject does not exist.');
    }

    return this.subjectRepository.updateSubject(subject, updateLessonDto);
  }

  async deleteSubject(id: number): Promise<void> {
    const result = await this.subjectRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Subject with ID ${id} not found.`);
    }
  }
}
