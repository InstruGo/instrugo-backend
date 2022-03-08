import { Repository, EntityRepository } from 'typeorm';

import { CreateRatingDto } from './dto/create-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { Rating } from './entities/rating.entity';

@EntityRepository(Rating)
export class RatingsRepository extends Repository<Rating> {
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

  async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
    const { rating, studentId, tutorId } = createRatingDto;

    const new_rating = new Rating();
    new_rating.rating = rating;
    new_rating.studentId = studentId;
    new_rating.tutorId = tutorId;

    await new_rating.save();
    return new_rating;
  }
}
