import { Repository, EntityRepository } from 'typeorm';

import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FilterLessonDto } from './dto/lesson-filter.dto';
import { Lesson } from './entities/lesson.entity';
import { LessonStatus } from './entities/lesson.status.enum';

@EntityRepository(Lesson)
export class LessonsRepository extends Repository<Lesson> {
  async getLessons(filterLessonDto: FilterLessonDto): Promise<Lesson[]> {
    const { level, grade, type, minPrice, maxPrice, status, subjectId } =
      filterLessonDto;
    const query = this.createQueryBuilder('lesson');

    if (level) {
      query.andWhere('lesson.level = :level', { level });
    }

    if (grade) {
      query.andWhere('lesson.grade = :grade', { grade });
    }

    if (type) {
      query.andWhere('lesson.type = :grade', { type });
    }

    if (subjectId) {
      query.andWhere('lesson.subjectId = :subjectId', { subjectId });
    }

    if (status) {
      query.andWhere('lesson.status = :status', { status });
    }

    if (minPrice) {
      query.andWhere('lesson.budget > :minPrice', { minPrice });
    }

    if (maxPrice) {
      query.andWhere('lesson.budget < :maxPrice', { maxPrice });
    }

    const lessons = await query.getMany();
    return lessons;
  }

  async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const {
      subfield,
      level,
      grade,
      description,
      type,
      location,
      budget,
      subjectId,
    } = createLessonDto;

    const lesson = new Lesson();
    lesson.subfield = subfield;
    lesson.level = level;
    lesson.grade = grade;
    lesson.description = description;
    lesson.type = type;
    lesson.location = location;
    lesson.budget = budget;
    lesson.subjectId = subjectId;
    lesson.createdOn = new Date(new Date().toISOString());
    lesson.lastModifiedOn = lesson.createdOn;
    lesson.status = LessonStatus.REQUEST;

    lesson.ownerId = 1; //ovdje promijeniti da bude id stvarnog stvaratelja,
    //placeholder samo za testiranje
    await lesson.save();
    return lesson;
  }

  async updateLesson(
    lesson: Lesson,
    updateLessonDto: UpdateLessonDto
  ): Promise<Lesson> {
    const {
      subfield,
      level,
      grade,
      description,
      type,
      location,
      budget,
      subjectId,
    } = updateLessonDto;

    if (subfield) lesson.subfield = subfield;
    if (level) lesson.level = level;
    if (grade) lesson.grade = grade;
    if (description) lesson.description = description;
    if (type) lesson.type = type;
    if (location) lesson.location = location;
    if (budget) lesson.budget = budget;
    if (subjectId) lesson.subjectId = subjectId;

    lesson.lastModifiedOn = new Date(new Date().toISOString());

    await lesson.save();
    return lesson;
  }
}
