import { Repository, EntityRepository } from 'typeorm';

import { FilterTutorResponseDto } from './dto/filter-tutor-response.dto';
import { TutorResponse } from './entities/tutor-response.entity';
import { User } from '../auth/entities/user.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { TimeFrame } from '../time-frames/entities/time-frame.entity';
import { CreateTutorResponseDto } from './dto/create-tutor-response.dto';
import { UpdateTutorResponseDto } from './dto/update-tutor-response.dto';

@EntityRepository(TutorResponse)
export class TutorResponseRepository extends Repository<TutorResponse> {
  async getTutorResponses(
    filterTutorResponseDto: FilterTutorResponseDto
  ): Promise<TutorResponse[]> {
    const { tutorId, lessonId } = filterTutorResponseDto;
    const query = this.createQueryBuilder('tutor-response');

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
    tutor: User,
    lesson: Lesson,
    tutorResponseTimeFrame: TimeFrame,
    createTutorResponseDto: CreateTutorResponseDto
  ): Promise<TutorResponse> {
    const response = new TutorResponse();
    response.price = createTutorResponseDto.price;
    response.tutor = tutor;
    response.lesson = lesson;
    response.tutorResponseTimeFrame = tutorResponseTimeFrame;

    await response.save();
    return response;
  }

  async updateTutorResponse(
    response: TutorResponse,
    tutorResponseTimeFrame: TimeFrame,
    updateTutorResponseDto: UpdateTutorResponseDto
  ): Promise<TutorResponse> {
    if (updateTutorResponseDto.price) {
      response.price = updateTutorResponseDto.price;
    }

    if (tutorResponseTimeFrame)
      response.tutorResponseTimeFrame = tutorResponseTimeFrame;

    await response.save();
    return response;
  }
}
