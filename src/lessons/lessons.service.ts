import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LessonRepository } from './lesson.repository';
import { Lesson } from './entities/lesson.entity';
import { SubjectRepository } from './subjects/subject.repository';
import { CreateLessonDto } from './dto/lessons/create-lesson.dto';
import { FilterLessonDto } from './dto/lessons/filter-lesson.dto';
import { UpdateLessonDto } from './dto/lessons/update-lesson.dto';
import { LessonStatus } from './entities/lesson.status.enum';
import { User } from '../auth/entities/user.entity';
import { TutorResponseRepository } from '../tutor-responses/tutor-responses.repository';
import { TimeFrameRepository } from '../time-frames/time-frames.repository';
import { TimeFrame } from '../time-frames/entities/time-frame.entity';
import { FilterPoolDto } from './dto/lessons/filter-pool.dto';
import { RatingRepository } from '../ratings/rating.repository';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
    @InjectRepository(TimeFrameRepository)
    private timeFrameRepository: TimeFrameRepository,
    @InjectRepository(TutorResponseRepository)
    private tutorResponseRepository: TutorResponseRepository,
    @InjectRepository(RatingRepository)
    private ratingRepository: RatingRepository
  ) {}

  getLessons(
    filterLessonDto: FilterLessonDto,
    userId: number
  ): Promise<Lesson[]> {
    return this.lessonRepository.getLessons(filterLessonDto, userId);
  }

  getPublicPool(filterPoolDto: FilterPoolDto): Promise<Lesson[]> {
    return this.lessonRepository.getPublicPool(filterPoolDto);
  }

  async getLesson(user: User, id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne(id);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }

    if (lesson.student.id !== user.id && lesson.tutor?.id !== user.id) {
      throw new ForbiddenException();
    }

    return lesson;
  }

  async createLesson(
    user: User,
    createLessonDto: CreateLessonDto
  ): Promise<Lesson> {
    const { subjectId, lessonTimeFrames: lessonTimeFrameDtos } =
      createLessonDto;

    const subject = await this.subjectRepository.findOne(subjectId);

    if (!subject) {
      throw new NotFoundException('Subject does not exist.');
    }

    const lessonTimeFrames = await this.timeFrameRepository.createTimeFrames(
      lessonTimeFrameDtos
    );

    return this.lessonRepository.createLesson(
      createLessonDto,
      user,
      subject,
      lessonTimeFrames
    );
  }

  async updateLesson(
    user: User,
    id: number,
    updateLessonDto: UpdateLessonDto
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne(id);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }

    if (lesson.student.id !== user.id) {
      throw new ForbiddenException();
    }

    if (
      lesson.status === LessonStatus.COMPLETED ||
      lesson.status === LessonStatus.CANCELED
    ) {
      throw new BadRequestException(
        'Completed or canceled lessons cannot be updated.'
      );
    }

    const { subjectId, lessonTimeFrames } = updateLessonDto;

    const subject = subjectId
      ? await this.subjectRepository.findOne(subjectId)
      : undefined;

    let lessonTimeFramesArr: TimeFrame[] = [];
    if (lessonTimeFrames) {
      await this.timeFrameRepository.deleteTimeFrames(lesson.lessonTimeFrames);

      lessonTimeFramesArr = await this.timeFrameRepository.createTimeFrames(
        lessonTimeFrames
      );
    }

    return this.lessonRepository.updateLesson(
      lesson,
      updateLessonDto,
      subject,
      lessonTimeFramesArr
    );
  }

  async deleteLesson(user: User, id: number): Promise<void> {
    const lesson = await this.lessonRepository.findOne(id);

    if (!lesson) {
      throw new NotFoundException();
    }

    if (lesson.student.id !== user.id) {
      throw new ForbiddenException();
    }

    if (lesson.status !== LessonStatus.REQUESTED) {
      throw new BadRequestException('Only lesson requests can be deleted.');
    }

    await lesson.remove();
  }

  async resolveLessonRequest(
    user: User,
    lessonId: number,
    tutorResponseId: number
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne(lessonId);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }

    if (lesson.student.id !== user.id) {
      throw new ForbiddenException();
    }

    if (lesson.status !== LessonStatus.REQUESTED) {
      throw new BadRequestException(
        'This lesson object has already been resolved.'
      );
    }

    const chosenTutorResponse = await this.tutorResponseRepository.findOne(
      tutorResponseId
    );

    const chosenTimeFrame = chosenTutorResponse.tutorResponseTimeFrame;

    const rating = await this.ratingRepository.createRating(
      lesson,
      lesson.student,
      chosenTutorResponse.tutor
    );

    return this.lessonRepository.resolveLessonRequest(
      lesson,
      chosenTutorResponse,
      chosenTimeFrame,
      rating
    );
  }

  async completeLesson(user: User, id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne(id);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }

    if (lesson.student.id !== user.id) {
      throw new ForbiddenException();
    }

    await this.timeFrameRepository.deleteTimeFrames(lesson.lessonTimeFrames);
    return this.lessonRepository.completeLesson(lesson);
  }

  async cancelPendingLesson(user: User, lessonId: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne(lessonId);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }

    if (lesson.student.id !== user.id) {
      throw new ForbiddenException();
    }

    if (lesson.status !== LessonStatus.PENDING) {
      throw new BadRequestException('Only pending lessons can be canceled.');
    }

    return this.lessonRepository.cancelPendingLesson(lesson);
  }
}
