import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonRepository } from './lesson.repository';
import { UserRepository } from '../auth/user.repository';
import { Subject } from './entities/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonRepository, UserRepository, Subject]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
