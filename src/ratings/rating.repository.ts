import { Repository, EntityRepository } from 'typeorm';

import { CreateRatingDto } from './dto/create-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { Rating } from './entities/rating.entity';
import { User } from '../auth/entities/user.entity';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Rating)
export class RatingRepository extends Repository<Rating> {
  async getRatings(filterRatingDto: FilterRatingDto): Promise<Rating[]> {
    const { rating, studentId, tutorId } = filterRatingDto;
    const query = this.createQueryBuilder('rating');

    if (rating) {
      query.andWhere('rating.rating = :rating', { rating });
    }

    if (studentId) {
      query.andWhere('rating.studentId = :studentId', { studentId });
    }

    if (tutorId) {
      query.andWhere('rating.tutorId = :tutorId', { tutorId });
    }

    const ratings = await query.getMany();
    return ratings;
  }

  async createRating(
    createRatingDto: CreateRatingDto,
    student: User,
    tutor: User
  ): Promise<Rating> {
    const { rating } = createRatingDto;

    const new_rating = new Rating();
    new_rating.rating = rating;

    new_rating.student = student;
    new_rating.tutor = tutor;

    await new_rating.save();

    const tutorInfo = tutor.tutor;

    const currentAverage = tutorInfo.averageRating;
    const ratingsCount = tutorInfo.ratingsCount;

    tutorInfo.averageRating = this.addToAverage(
      currentAverage,
      rating,
      ratingsCount
    );

    tutorInfo.ratingsCount = tutorInfo.ratingsCount + 1;

    await tutorInfo.save();

    return new_rating;
  }

  async updateRating(
    rating: Rating,
    updateRatingDto: UpdateRatingDto
  ): Promise<Rating> {
    const oldValue = rating.rating;
    const tutor = rating.tutor.tutor;

    const currentAverage = tutor.averageRating;
    const currentCount = tutor.ratingsCount;

    if (updateRatingDto.rating) {
      rating.rating = updateRatingDto.rating;

      tutor.averageRating = this.updateAverage(
        currentAverage,
        oldValue,
        updateRatingDto.rating,
        currentCount
      );

      await tutor.save();
    }

    await rating.save();
    return rating;
  }

  async deleteRating(id: number): Promise<void> {
    const rating = await this.findOne(id);
    const value = rating.rating;

    const tutor = rating.tutor.tutor;
    const currentAverage = tutor.averageRating;
    const currentCount = tutor.ratingsCount;

    tutor.averageRating = this.removeFromAverage(
      currentAverage,
      value,
      currentCount
    );

    tutor.ratingsCount = currentCount - 1;

    const result = await this.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Rating with ID ${id} not found.`);
    }

    await tutor.save();
  }

  private addToAverage(avg: number, value: number, count: number) {
    return (count * avg + value) / (count + 1);
  }

  private updateAverage(
    avg: number,
    oldValue: number,
    newValue: number,
    count: number
  ) {
    return (count * avg - oldValue + newValue) / count;
  }

  private removeFromAverage(avg: number, value: number, count: number) {
    if (count === 1) return 0;

    return (count * avg - value) / (count - 1);
  }
}
