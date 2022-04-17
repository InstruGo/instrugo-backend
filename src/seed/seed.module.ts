import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';
import { SubjectRepository } from '../lessons/subjects/subject.repository';
import { LessonsModule } from '../lessons/lessons.module';
import { LessonsService } from '../lessons/lessons.service';
import { TutorResponsesService } from '../tutor-responses/tutor-responses.service';
import { LessonRepository } from '../lessons/lesson.repository';
import { TimeFrameRepository } from '../time-frames/time-frames.repository';
import { TutorResponseRepository } from '../tutor-responses/tutor-responses.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      SubjectRepository,
      LessonRepository,
      TimeFrameRepository,
      TutorResponseRepository,
    ]),
    LessonsModule,
  ],
  providers: [SeedService, LessonsService, TutorResponsesService],
})
export class SeedModule {}
