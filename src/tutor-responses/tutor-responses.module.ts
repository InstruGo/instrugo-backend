import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TutorResponsesService } from './tutor-responses.service';
import { TutorResponsesController } from './tutor-responses.controller';
import { TutorResponseRepository } from './tutor-responses.repository';
import { LessonRepository } from '../lessons/lesson.repository';
import { UserRepository } from '../auth/user.repository';
import { LessonTimeFrameRepository } from '../lessons/lesson-time-frames/lesson-time-frames.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LessonRepository,
      UserRepository,
      TutorResponseRepository,
      LessonTimeFrameRepository,
    ]),
  ],
  controllers: [TutorResponsesController],
  providers: [TutorResponsesService],
})
export class TutorResponsesModule {}
