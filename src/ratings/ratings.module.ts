import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { RatingsRepository } from './ratings.repository';
import { UserRepository } from '../auth/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RatingsRepository, UserRepository])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
