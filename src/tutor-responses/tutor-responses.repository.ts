import { Repository, EntityRepository } from 'typeorm';

import { CreateTutorResponseDto } from './dto/create-tutor-response.dto';
import { UpdateTutorResponseDto } from './dto/update-tutor-response.dto';
import { FilterTutorResponseDto } from './dto/filter-tutor-response.dto';
import { TutorResponse } from './entities/tutor-response.entity';
import { User } from '../auth/entities/user.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

@EntityRepository(TutorResponse)
export class TutorResponseRepository extends Repository<TutorResponse> {
  async getTutorResponses(
    filterTutorResponseDto: FilterTutorResponseDto
  ): Promise<TutorResponse[]> {
    const { price, tutorId, lessonId } = filterTutorResponseDto;
    const query = this.createQueryBuilder('tutor-response');

    if (price) {
      query.andWhere('tutor-response.price = :price', { price });
    }

    if (tutorId) {
      query.andWhere('tutor-response.tutorId = :tutorId', { tutorId });
    }

    if (lessonId) {
      query.andWhere('tutor-response.lessonId = :lessonId', { lessonId });
    }

    const responses = await query.getMany();
    return responses;
  }

  async createTutorResponse(
    createTutorResponseDto: CreateTutorResponseDto,
    tutor: User,
    lesson: Lesson
  ): Promise<TutorResponse> {
    const { price } = createTutorResponseDto;
    const response = new TutorResponse();
    response.price = price;
    response.tutor = tutor;
    response.lesson = lesson;

    await response.save();
    return response;
  }

  async updateTutorResponse(
    response: TutorResponse,
    updateTutorResponseDto: UpdateTutorResponseDto
  ): Promise<TutorResponse> {
    const { price } = updateTutorResponseDto;

    if (price) {
      response.price = price;
    }

    await response.save();
    return response;
  }
}
