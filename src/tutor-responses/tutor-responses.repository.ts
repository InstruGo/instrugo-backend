import { Repository, EntityRepository } from 'typeorm';

import { FilterTutorResponseDto } from './dto/filter-tutor-response.dto';
import { TutorResponse } from './entities/tutor-response.entity';
import { User } from '../auth/entities/user.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { TutorResponseTimeFrame } from './entities/tutor-response-time-frame.entity';

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
    tutorResponseTimeFrames: TutorResponseTimeFrame[]
  ): Promise<TutorResponse> {
    const response = new TutorResponse();
    response.tutor = tutor;
    response.lesson = lesson;
    response.tutorResponseTimeFrames = tutorResponseTimeFrames;

    await response.save();
    return response;
  }

  async updateTutorResponse(
    response: TutorResponse,
    tutorResponseTimeFrames: TutorResponseTimeFrame[]
  ): Promise<TutorResponse> {
    if (tutorResponseTimeFrames)
      response.tutorResponseTimeFrames = tutorResponseTimeFrames;

    await response.save();
    return response;
  }
}
