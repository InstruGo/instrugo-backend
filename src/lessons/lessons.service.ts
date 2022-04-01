import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LessonRepository } from './lesson.repository';
import { UserRepository } from '../auth/user.repository';
import { Lesson } from './entities/lesson.entity';
import { SubjectRepository } from './subjects/subject.repository';
import { CreateLessonDto } from './dto/lessons/create-lesson.dto';
import { FilterLessonDto } from './dto/lessons/filter-lesson.dto';
import { UpdateLessonDto } from './dto/lessons/update-lesson.dto';
import { LessonTimeFrameRepository } from './lesson-time-frames/lesson-time-frames.repository';
import { LessonTimeFrame } from './entities/lesson-time-frame.entity';
import { CreateLessonTimeFrameDto } from './dto/lesson-time-frames/create-lesson-time-frame.dto';
import { LessonStatus } from './entities/lesson.status.enum';
import { TutorResponseTimeFrameRepository } from '../tutor-responses/tutor-response-time-frames/tutor-response-time-frames.repository';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
    @InjectRepository(LessonTimeFrameRepository)
    private lessonTimeFrameRepository: LessonTimeFrameRepository,
    @InjectRepository(TutorResponseTimeFrameRepository)
    private tutorResponseTimeFrameRepository: TutorResponseTimeFrameRepository
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
    if (!owner) {
      throw new NotFoundException('Owner of lesson does not exist');
    }
    const subject = await this.subjectRepository.findOne(
      createLessonDto.subjectId
    );
    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }

    const lessonTimeFrames =
      await this.lessonTimeFrameRepository.createLessonTimeFrames(
        createLessonDto.lessonTimeFrames
      );

    return this.lessonRepository.createLesson(
      createLessonDto,
      owner,
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
    id: number,
    chosenTutorResponseTimeFrameId: number
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne(id);

    if (!lesson) {
      throw new NotFoundException('Specified lesson does not exist.');
    }

    if (lesson.status !== LessonStatus.REQUEST) {
      throw new BadRequestException(
        'This lesson object has already been resolved.'
      );
    }

    const chosenTutorResponseTimeFrame =
      await this.tutorResponseTimeFrameRepository.findOne(
        chosenTutorResponseTimeFrameId
      );

    return this.lessonRepository.resolveLessonRequest(
      lesson,
      chosenTutorResponseTimeFrame
    );
  }
}
