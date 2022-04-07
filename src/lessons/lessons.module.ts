import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonRepository } from './lesson.repository';
import { UserRepository } from '../auth/user.repository';
import { SubjectsService } from './subjects/subjects.service';
import { SubjectsController } from './subjects/subjects.controller';
import { SubjectRepository } from './subjects/subject.repository';
import { TimeFramesController } from 'src/time-frames/time-frames.controller';
import { TimeFrameRepository } from 'src/time-frames/time-frames.repository';
import { TimeFramesService } from 'src/time-frames/time-frames.service';
import { TutorResponseRepository } from '../tutor-responses/tutor-responses.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LessonRepository,
      UserRepository,
      SubjectRepository,
      TutorResponseRepository,
      TimeFrameRepository,
    ]),
  ],
  controllers: [LessonsController, SubjectsController, TimeFramesController],
  providers: [LessonsService, SubjectsService, TimeFramesService],
})
export class LessonsModule {}
