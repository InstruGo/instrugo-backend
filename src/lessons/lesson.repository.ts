import { Repository, EntityRepository } from 'typeorm';

import { Lesson } from './entities/lesson.entity';
import { LessonStatus } from './entities/lesson.status.enum';
import { User } from '../auth/entities/user.entity';
import { Subject } from './entities/subject.entity';
import { CreateLessonDto } from './dto/lessons/create-lesson.dto';
import { UpdateLessonDto } from './dto/lessons/update-lesson.dto';
import { FilterLessonDto } from './dto/lessons/filter-lesson.dto';
import { TimeFrame } from '../time-frames/entities/time-frame.entity';
import { TutorResponse } from '../tutor-responses/entities/tutor-response.entity';
import { FilterPoolDto } from './dto/lessons/filter-pool.dto';

@EntityRepository(Lesson)
export class LessonRepository extends Repository<Lesson> {
  async getLessons(
    filterLessonDto: FilterLessonDto,
    userId: number
  ): Promise<Lesson[]> {
    const {
      educationLevel,
      grade,
      type,
      minPrice,
      maxPrice,
      status,
      subjectIds,
      after,
      before,
      isLessonTutor,
    } = filterLessonDto;

    const query = this.createQueryBuilder('lesson');

    if (educationLevel) {
      query.andWhere('lesson.educationLevel = :educationLevel', {
        educationLevel,
      });
    }

    if (grade) {
      query.andWhere('lesson.grade = :grade', { grade });
    }

    if (type) {
      query.andWhere('lesson.type = :type', { type });
    }

    if (subjectIds) {
      query.andWhere('lesson.subjectId IN (:...subjectIds)', { subjectIds });
    }

    if (isLessonTutor) {
      query.andWhere('lesson.tutorId = :userId', { userId });
    } else {
      query.andWhere('lesson.studentId = :userId', { userId });
    }

    if (status) {
      query.andWhere('lesson.status = :status', { status });
    }

    if (minPrice) {
      query.andWhere('lesson.budget >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      query.andWhere('lesson.budget <= :maxPrice', { maxPrice });
    }

    query.leftJoinAndSelect('lesson.subject', 'subject');
    query.leftJoinAndSelect('lesson.lessonTimeFrames', 'timeFrame');

    let lessons = await query.getMany();

    if (after) {
      lessons = lessons.filter((lesson) =>
        lesson.hasTimeSlotAfterDate(new Date(after))
      );
    }

    if (before) {
      lessons = lessons.filter((lesson) =>
        lesson.hasTimeSlotBeforeDate(new Date(before))
      );
    }

    return lessons;
  }

  async getPublicPool(filterPoolDto: FilterPoolDto): Promise<Lesson[]> {
    const {
      educationLevel,
      grade,
      type,
      minBudget,
      maxBudget,
      after,
      before,
      subjectIds,
    } = filterPoolDto;

    const query = this.createQueryBuilder('lesson');
    query.where('lesson.status = :status', { status: LessonStatus.REQUESTED });

    if (educationLevel) {
      query.andWhere('lesson.educationLevel = :educationLevel', {
        educationLevel,
      });
    }

    if (grade) {
      query.andWhere('lesson.grade = :grade', { grade });
    }

    if (type) {
      query.andWhere('lesson.type = :type', { type });
    }

    if (subjectIds) {
      query.andWhere('lesson.subjectId IN (:...subjectIds)', { subjectIds });
    }

    if (minBudget) {
      query.andWhere('lesson.budget >= :minBudget', { minBudget });
    }

    if (maxBudget) {
      query.andWhere('lesson.budget <= :maxBudget', { maxBudget });
    }

    query.leftJoinAndSelect('lesson.subject', 'subject');
    query.leftJoinAndSelect('lesson.student', 'user');
    query.leftJoinAndSelect('lesson.lessonTimeFrames', 'timeFrame');

    let pool = await query.getMany();

    if (after) {
      pool = pool.filter((lesson) =>
        lesson.hasTimeSlotAfterDate(new Date(after))
      );
    }

    if (before) {
      pool = pool.filter((lesson) =>
        lesson.hasTimeSlotBeforeDate(new Date(before))
      );
    }

    return pool;
  }

  async createLesson(
    createLessonDto: CreateLessonDto,
    student: User,
    subject: Subject,
    lessonTimeFrames: TimeFrame[]
  ): Promise<Lesson> {
    const {
      subfield,
      educationLevel,
      grade,
      description,
      type,
      location,
      duration,
      budget,
    } = createLessonDto;

    const lesson = new Lesson();
    lesson.subfield = subfield;
    lesson.educationLevel = educationLevel;
    lesson.grade = grade;
    lesson.description = description;
    lesson.type = type;
    lesson.location = location;
    lesson.duration = duration;
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
    lessonTimeFrames: TimeFrame[]
  ): Promise<Lesson> {
    const {
      subfield,
      educationLevel,
      grade,
      description,
      type,
      location,
      duration,
      budget,
    } = updateLessonDto;

    if (subfield) lesson.subfield = subfield;
    if (educationLevel) lesson.educationLevel = educationLevel;
    if (grade) lesson.grade = grade;
    if (description) lesson.description = description;
    if (type) lesson.type = type;
    if (location) lesson.location = location;
    if (duration) lesson.duration = duration;
    if (budget) lesson.budget = budget;

    if (subject) lesson.subject = subject;
    if (lessonTimeFrames) lesson.lessonTimeFrames = lessonTimeFrames;

    await lesson.save();
    return lesson;
  }

  async resolveLessonRequest(
    lesson: Lesson,
    chosenTutorResponse: TutorResponse,
    chosenTimeFrame: TimeFrame
  ): Promise<Lesson> {
    lesson.status = LessonStatus.PENDING;
    lesson.finalStartTime = chosenTimeFrame.startTime;
    lesson.finalEndTime = chosenTimeFrame.endTime;
    lesson.finalPrice = chosenTutorResponse.price;
    lesson.tutor = chosenTutorResponse.tutor;

    await lesson.save();
    return lesson;
  }

  async cancelPendingLesson(lesson: Lesson): Promise<Lesson> {
    lesson.status = LessonStatus.CANCELED;

    lesson.save();
    return lesson;
  }
}
