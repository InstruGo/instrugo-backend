import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRatingDto } from './dto/create-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { RatingsRepository } from './ratings.repository';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingsRepository)
    private ratingsRepository: RatingsRepository
  ) {}
  create(createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.ratingsRepository.createRating(createRatingDto);
  }

  findAll(filterRatingDto: FilterRatingDto): Promise<Rating[]> {
    return this.ratingsRepository.getRatings(filterRatingDto);
  }

  async findOne(id: number): Promise<Rating> {
    const rating = await this.ratingsRepository.findOne(id);

    if (!rating) {
      throw new NotFoundException('Specified lesson does not exist.');
    }
    return rating;
  }

  async remove(id: number): Promise<void> {
    const result = await this.ratingsRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Rating with ID ${id} not found.`);
    }
  }
}
