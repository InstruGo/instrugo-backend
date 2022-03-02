import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonsRepository } from './lessons.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LessonsRepository])],
  controllers: [LessonsController],
  providers: [LessonsService]
})
export class LessonsModule {}
