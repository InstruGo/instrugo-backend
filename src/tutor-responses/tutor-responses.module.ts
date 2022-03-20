import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TutorResponsesService } from './tutor-responses.service';
import { TutorResponsesController } from './tutor-responses.controller';
import { TutorResponseRepository } from './tutor-responses.repository';
import { LessonRepository } from '../lessons/lesson.repository';
import { UserRepository } from '../auth/user.repository';
import { TutorResponseTimeFrameRepository } from './tutor-response-time-frames/tutor-response-time-frames.repository';
import { TutorResponseTimeFramesController } from './tutor-response-time-frames/tutor-response-time-frames.controller';
import { TutorResponseTimeFramesService } from './tutor-response-time-frames/tutor-response-time-frames.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LessonRepository,
      UserRepository,
      TutorResponseRepository,
      TutorResponseTimeFrameRepository,
    ]),
  ],
  controllers: [TutorResponsesController, TutorResponseTimeFramesController],
  providers: [TutorResponsesService, TutorResponseTimeFramesService],
})
export class TutorResponsesModule {}
