import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonRepository } from './lesson.repository';
import { UserRepository } from '../auth/user.repository';
import { SubjectsService } from './subjects/subjects.service';
import { SubjectsController } from './subjects/subjects.controller';
import { SubjectRepository } from './subjects/subject.repository';
import { LessonTimeFramesService } from './lesson-time-frames/lesson-time-frames.service';
import { LessonTimeFrameRepository } from './lesson-time-frames/lesson-time-frames.repository';
import { LessonTimeFramesController } from './lesson-time-frames/lesson-time-frames.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LessonRepository,
      UserRepository,
      SubjectRepository,
      LessonTimeFrameRepository,
    ]),
  ],
  controllers: [
    LessonsController,
    SubjectsController,
    LessonTimeFramesController,
  ],
  providers: [LessonsService, SubjectsService, LessonTimeFramesService],
})
export class LessonsModule {}
