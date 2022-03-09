import { Repository, EntityRepository } from 'typeorm';

import { CreateRatingDto } from './dto/create-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { Rating } from './entities/rating.entity';
import { User } from '../auth/entities/user.entity';
import { UpdateRatingDto } from './dto/update-rating.dto';

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
    return new_rating;
  }

  async updateRating(
    rating: Rating,
    updateRatingDto: UpdateRatingDto
  ): Promise<Rating> {
    if (updateRatingDto.rating) rating.rating = updateRatingDto.rating;

    await rating.save();
    return rating;
  }
}
