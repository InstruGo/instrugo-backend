import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRatingDto } from './dto/create-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { RatingRepository } from './rating.repository';
import { Rating } from './entities/rating.entity';
import { UserRepository } from '../auth/user.repository';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingRepository)
    private ratingRepository: RatingRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  getRatings(filterRatingDto: FilterRatingDto): Promise<Rating[]> {
    return this.ratingRepository.getRatings(filterRatingDto);
  }

  async getRating(id: number): Promise<Rating> {
    const rating = await this.ratingRepository.findOne(id);

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

    if (!student) {
      throw new NotFoundException(
        `Student with ID ${createRatingDto.studentId} not found.`
      );
    }

    if (!tutor) {
      throw new NotFoundException(
        `Tutor with ID ${createRatingDto.tutorId} not found.`
      );
    }

    return this.ratingRepository.createRating(createRatingDto, student, tutor);
  }

  async updateRating(
    id: number,
    updateRatingDto: UpdateRatingDto
  ): Promise<Rating> {
    const rating = await this.ratingRepository.findOne(id);

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found.`);
    }

    return this.ratingRepository.updateRating(rating, updateRatingDto);
  }

  async deleteRating(id: number): Promise<void> {
    return this.ratingRepository.deleteRating(id);
  }
}
