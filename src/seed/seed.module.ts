import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';
import { SubjectRepository } from '../lessons/subjects/subject.repository';
import { LessonRepository } from '../lessons/lesson.repository';
import { RatingRepository } from '../ratings/rating.repository';
import { TimeFrameRepository } from '../time-frames/time-frames.repository';
import { TutorResponseRepository } from '../tutor-responses/tutor-responses.repository';
import { LessonsModule } from '../lessons/lessons.module';
import { LessonsService } from '../lessons/lessons.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      SubjectRepository,
      LessonRepository,
      RatingRepository,
      TutorResponseRepository,
      TimeFrameRepository,
    ]),
    LessonsModule,
  ],
  providers: [SeedService, LessonsService],
})
export class SeedModule {}
