import { Repository, EntityRepository } from 'typeorm';

import { Lesson } from './entities/lesson.entity';
import { LessonStatus } from './entities/lesson.status.enum';
import { User } from '../auth/entities/user.entity';
import { Subject } from './entities/subject.entity';
import { CreateLessonDto } from './dto/lessons/create-lesson.dto';
import { UpdateLessonDto } from './dto/lessons/update-lesson.dto';
import { FilterLessonDto } from './dto/lessons/filter-lesson.dto';
import { LessonTimeFrame } from './entities/lesson-time-frame.entity';
import { TutorResponseTimeFrame } from '../tutor-responses/entities/tutor-response-time-frame.entity';

@EntityRepository(Lesson)
export class LessonRepository extends Repository<Lesson> {
  async getLessons(filterLessonDto: FilterLessonDto): Promise<Lesson[]> {
    const {
      level,
      grade,
      type,
      minPrice,
      maxPrice,
      status,
      subjectId,
      studentId,
    } = filterLessonDto;
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

    if (studentId) {
      query.andWhere('lesson.studentId = :studentId', { studentId });
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

    query.leftJoinAndSelect('lesson.subject', 'subject');
    query.leftJoinAndSelect('lesson.student', 'user');
    query.leftJoinAndSelect('lesson.lessonTimeFrames', 'lessonTimeFrame');
    const lessons = await query.getMany();
    return lessons;
  }

  async createLesson(
    createLessonDto: CreateLessonDto,
    student: User,
    subject: Subject,
    lessonTimeFrames: LessonTimeFrame[]
  ): Promise<Lesson> {
    const { subfield, level, grade, description, type, location, budget } =
      createLessonDto;

    const lesson = new Lesson();
    lesson.subfield = subfield;
    lesson.level = level;
    lesson.grade = grade;
    lesson.description = description;
    lesson.type = type;
    lesson.location = location;
    lesson.budget = budget;
    lesson.status = LessonStatus.REQUESTED;

    lesson.student = student;
    lesson.subject = subject;
    lesson.lessonTimeFrames = lessonTimeFrames;

    await lesson.save();
    return lesson;
  }

  async updateLesson(
    lesson: Lesson,
    updateLessonDto: UpdateLessonDto,
    subject: Subject,
    lessonTimeFrames: LessonTimeFrame[]
  ): Promise<Lesson> {
    const { subfield, level, grade, description, type, location, budget } =
      updateLessonDto;

    if (subfield) lesson.subfield = subfield;
    if (level) lesson.level = level;
    if (grade) lesson.grade = grade;
    if (description) lesson.description = description;
    if (type) lesson.type = type;
    if (location) lesson.location = location;
    if (budget) lesson.budget = budget;

    if (subject) lesson.subject = subject;
    if (lessonTimeFrames) lesson.lessonTimeFrames = lessonTimeFrames;

    await lesson.save();
    return lesson;
  }

  async resolveLessonRequest(
    lesson: Lesson,
    chosenTutorResponseTimeFrame: TutorResponseTimeFrame
  ): Promise<Lesson> {
    lesson.status = LessonStatus.PENDING;

    await lesson.save();
    return lesson;
  }
}
