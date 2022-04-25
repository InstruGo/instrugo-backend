import { Repository, EntityRepository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { FilterRatingDto } from './dto/filter-rating.dto';
import { Rating } from './entities/rating.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { RateLessonDto } from './dto/rate-lesson.dto';
import { LeaveFeedbackDto } from './dto/leave-feedback.dto';

@EntityRepository(Rating)
export class RatingRepository extends Repository<Rating> {
  async getRatings(filterRatingDto: FilterRatingDto): Promise<Rating[]> {
    const { studentRating, lessonId, studentId, tutorId } = filterRatingDto;
    const query = this.createQueryBuilder('rating');

    if (studentRating) {
      query.andWhere('rating.studentRating = :studentRating', {
        studentRating,
      });
    }

    if (lessonId) {
      query.andWhere('rating.lessonId = :lessonId', { lessonId });
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

  async createRating(): Promise<Rating> {
    const newRating = new Rating();
    await newRating.save();
    return newRating;
  }

  async rateLesson(
    lesson: Lesson,
    rateLessonDto: RateLessonDto
  ): Promise<Rating> {
    const { studentRating } = rateLessonDto;

    const rating = lesson.rating;
    const oldValue = rating.studentRating;
    const tutor = lesson.tutor;

    if (!oldValue) {
      tutor.addRatingAndUpdateRatingsCount(studentRating);
    } else {
      tutor.updateRating(oldValue, studentRating);
    }

    await tutor.save();

    rating.studentRating = studentRating;
    await rating.save();

    return rating;
  }

  async leaveFeedback(
    lesson: Lesson,
    leaveFeedbackDto: LeaveFeedbackDto
  ): Promise<Rating> {
    const rating = lesson.rating;
    rating.tutorFeedback = leaveFeedbackDto.tutorFeedback;

    await rating.save();
    return rating;
  }

  async deleteRating(rating: Rating): Promise<void> {
    const studentRating = rating.studentRating;
    const tutor = rating.lesson.tutor;

    const result = await this.delete(rating.id);

    if (!result.affected) {
      throw new NotFoundException(`Rating with ID ${rating.id} not found.`);
    }

    tutor.deleteRatingAndUpdateRatingsCount(studentRating);
    await tutor.save();
  }
}
