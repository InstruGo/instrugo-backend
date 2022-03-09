import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRatingDto } from './dto/create-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { RatingsRepository } from './ratings.repository';
import { Rating } from './entities/rating.entity';
import { UserRepository } from '../auth/user.repository';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingsRepository)
    private ratingsRepository: RatingsRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  getRatings(filterRatingDto: FilterRatingDto): Promise<Rating[]> {
    return this.ratingsRepository.getRatings(filterRatingDto);
  }

  async getRating(id: number): Promise<Rating> {
    const rating = await this.ratingsRepository.findOne(id);

    if (!rating) {
      throw new NotFoundException('Specified rating does not exist.');
    }
    return rating;
  }

  async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
    const student = await this.userRepository.findOne(
      createRatingDto.studentId
    );
    const tutor = await this.userRepository.findOne(createRatingDto.tutorId);

    return this.ratingsRepository.createRating(createRatingDto, student, tutor);
  }

  async updateRating(
    id: number,
    updateRatingDto: UpdateRatingDto
  ): Promise<Rating> {
    const rating = await this.ratingsRepository.findOne(id);

    return this.ratingsRepository.updateRating(rating, updateRatingDto);
  }

  async deleteRating(id: number): Promise<void> {
    const result = await this.ratingsRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Rating with ID ${id} not found.`);
    }
  }
}
