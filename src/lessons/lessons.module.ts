import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonRepository } from './lesson.repository';
import { UserRepository } from '../auth/user.repository';
import { SubjectsService } from './subjects/subjects.service';
import { SubjectsController } from './subjects/subjects.controller';
import { SubjectRepository } from './subjects/subject.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LessonRepository,
      UserRepository,
      SubjectRepository,
    ]),
  ],
  controllers: [LessonsController, SubjectsController],
  providers: [LessonsService, SubjectsService],
})
export class LessonsModule {}
