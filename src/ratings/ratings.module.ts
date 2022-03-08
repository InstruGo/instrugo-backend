import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { RatingsRepository } from './ratings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RatingsRepository])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
