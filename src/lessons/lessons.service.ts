import {
  BadRequestException,
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
import { LessonTimeFrameRepository } from './lesson-time-frames/lesson-time-frames.repository';
import { LessonTimeFrame } from './entities/lesson-time-frame.entity';
import { LessonStatus } from './entities/lesson.status.enum';
import { User } from '../auth/entities/user.entity';
import { TutorResponseRepository } from '../tutor-responses/tutor-responses.repository';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
    @InjectRepository(LessonTimeFrameRepository)
    private lessonTimeFrameRepository: LessonTimeFrameRepository,
    @InjectRepository(TutorResponseRepository)
    private tutorResponseRepository: TutorResponseRepository
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

    const lessonTimeFrames =
      await this.lessonTimeFrameRepository.createLessonTimeFrames(
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
    id: number,
    updateLessonDto: UpdateLessonDto
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne(id);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }

    const { subjectId, lessonTimeFrames } = updateLessonDto;

    const subject = subjectId
      ? await this.subjectRepository.findOne(subjectId)
      : undefined;

    let lessonTimeFramesArr: LessonTimeFrame[] = [];
    if (lessonTimeFrames) {
      await this.lessonTimeFrameRepository.deleteLessonTimeFrames(
        lesson.lessonTimeFrames
      );

      lessonTimeFramesArr =
        await this.lessonTimeFrameRepository.createLessonTimeFrames(
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

  async deleteLesson(id: number): Promise<void> {
    const result = await this.lessonRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Lesson with ID ${id} not found.`);
    }
  }

  async resolveLessonRequest(
    lessonId: number,
    chosenTutorResponseId: number,
    chosenTimeFrameId: number
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne(lessonId);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }

    if (lesson.status !== LessonStatus.REQUESTED) {
      throw new BadRequestException(
        'This lesson object has already been resolved.'
      );
    }

    const chosenTutorResponse = await this.tutorResponseRepository.findOne(
      chosenTutorResponseId
    );

    const chosenTimeFrame = await this.lessonTimeFrameRepository.findOne(
      chosenTimeFrameId
    );

    return this.lessonRepository.resolveLessonRequest(
      lesson,
      chosenTutorResponse,
      chosenTimeFrame
    );
  }
}
