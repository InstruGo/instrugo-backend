import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimeFramesController } from './time-frames.controller';
import { TimeFramesService } from './time-frames.service';
import { TimeFrameRepository } from './time-frames.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TimeFrameRepository])],
  controllers: [TimeFramesController],
  providers: [TimeFramesService],
})
export class TimeFramesModule {}
