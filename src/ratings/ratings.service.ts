import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilterRatingDto } from './dto/filter-rating.dto';
import { RatingRepository } from './rating.repository';
import { Rating } from './entities/rating.entity';
import { UserRepository } from '../auth/user.repository';
import { LessonRepository } from '../lessons/lesson.repository';
import { RateLessonDto } from './dto/rate-lesson.dto';
import { LeaveFeedbackDto } from './dto/leave-feedback.dto';
import { LessonStatus } from 'src/lessons/entities/lesson.status.enum';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingRepository)
    private ratingRepository: RatingRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository
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

  async createRating(): Promise<Rating> {
    return this.ratingRepository.createRating();
  }

  async rateLesson(
    lessonId: number,
    rateLessonDto: RateLessonDto
  ): Promise<Rating> {
    const lesson = await this.lessonRepository.findOne(lessonId);

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found.`);
    }

    if (lesson.status !== LessonStatus.COMPLETED) {
      throw new BadRequestException('Can only rate completed lessons.');
    }

    return this.ratingRepository.rateLesson(lesson, rateLessonDto);
  }

  async leaveFeedback(
    lessonId: number,
    leaveFeedbackDto: LeaveFeedbackDto
  ): Promise<Rating> {
    const lesson = await this.lessonRepository.findOne(lessonId);

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found.`);
    }

    if (lesson.status !== LessonStatus.COMPLETED) {
      throw new BadRequestException(
        'Can only leave feedback on completed lessons.'
      );
    }

    return this.ratingRepository.leaveFeedback(lesson, leaveFeedbackDto);
  }

  async deleteRating(id: number): Promise<void> {
    const rating = await this.ratingRepository.findOne(id, {
      relations: ['lesson'],
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found.`);
    }

    return this.ratingRepository.deleteRating(rating);
  }
}
