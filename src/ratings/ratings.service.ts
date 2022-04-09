import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRatingDto } from './dto/create-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { RatingRepository } from './rating.repository';
import { Rating } from './entities/rating.entity';
import { UserRepository } from '../auth/user.repository';
import { LessonRepository } from '../lessons/lesson.repository';
import { RateLessonDto } from './dto/rate-lesson.dto';
import { LeaveFeedbackDto } from './dto/leave-feedback.dto';

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

  async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
    const { lessonId, studentId, tutorId } = createRatingDto;

    if (studentId === tutorId) {
      throw new BadRequestException(
        'Student and tutor cannot be the same user.'
      );
    }

    const lesson = await this.lessonRepository.findOne(lessonId);

    if (!lesson) {
      throw new NotFoundException(`Tutor with ID ${tutorId} not found.`);
    }

    const student = await this.userRepository.findOne(studentId);

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found.`);
    }

    const tutor = await this.userRepository.findOne(tutorId);

    if (!tutor) {
      throw new NotFoundException(`Tutor with ID ${tutorId} not found.`);
    }

    return this.ratingRepository.createRating(lesson, student, tutor);
  }

  async rateLesson(id: number, rateLessonDto: RateLessonDto): Promise<Rating> {
    const rating = await this.ratingRepository.findOne(id);

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found.`);
    }

    return this.ratingRepository.rateLesson(rating, rateLessonDto);
  }

  async leaveFeedback(
    id: number,
    leaveFeedbackDto: LeaveFeedbackDto
  ): Promise<Rating> {
    const rating = await this.ratingRepository.findOne(id);

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found.`);
    }

    return this.ratingRepository.leaveFeedback(rating, leaveFeedbackDto);
  }

  async deleteRating(id: number): Promise<void> {
    const rating = await this.ratingRepository.findOne(id);

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found.`);
    }

    return this.ratingRepository.deleteRating(rating);
  }
}
