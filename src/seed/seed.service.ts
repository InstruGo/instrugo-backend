import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { UserRepository } from '../auth/user.repository';
import { SubjectRepository } from '../lessons/subjects/subject.repository';
import { subjects } from './data/subjects';
import { LessonsService } from '../lessons/lessons.service';
import { admins, students, tutors } from './data/users';
import {
  filipLessons,
  filipLessonsToResolve,
  ivanLessons,
} from './data/lessons';
import { tutorResponses } from './data/tutorResponses';
import { TutorResponsesService } from '../tutor-responses/tutor-responses.service';
import { RatingsService } from '../ratings/ratings.service';
import { User } from '../auth/entities/user.entity';
import { CreateTutorResponseDto } from '../tutor-responses/dto/create-tutor-response.dto';
import { TutorResponse } from '../tutor-responses/entities/tutor-response.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private configService: ConfigService,
    @InjectConnection() private readonly connection: Connection,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
    private readonly lessonsService: LessonsService,
    private readonly tutorResponsesService: TutorResponsesService,
    private readonly ratingsService: RatingsService
  ) {}

  getDbHandle(): Connection {
    return this.connection;
  }

  async onApplicationBootstrap() {
    const shouldSeed = await this.shouldSeed();

    if (!shouldSeed) {
      return;
    }

    await this.seedAdmins();
    await this.seedStudents();
    await this.seedTutors();
    await this.seedSubjects();
    await this.seedLessons();

    this.logger.log('Database seeding completed.');
  }

  private async shouldSeed() {
    const isDatabaseEmpty = await this.isDatabaseEmpty();
    const isSeedEnv = !!parseInt(this.configService.get('SEED_DB'));

    return isDatabaseEmpty && isSeedEnv;
  }

  private async isDatabaseEmpty() {
    const userCount = await this.userRepository.count();
    const subjectsCount = await this.subjectRepository.count();

    return userCount === 0 && subjectsCount === 0;
  }

  private async seedAdmins() {
    await Promise.all(
      admins.map(async (admin) => {
        await this.userRepository.register(admin, undefined, true);
      })
    );
  }

  private async seedStudents() {
    await Promise.all(
      students.map(async (student) => {
        await this.userRepository.register(student, undefined, false);
      })
    );
  }

  private async seedTutors() {
    await Promise.all(
      tutors.map(async (tutor) => {
        await this.userRepository.register(tutor, undefined, false);
      })
    );
  }

  private async seedSubjects() {
    await Promise.all(
      subjects.map(async (subject) => {
        await this.subjectRepository.createSubject(subject);
      })
    );
  }

  private async seedLessons() {
    const userFilip = await this.userRepository.findOne({
      where: { email: 'filip.todoric@fer.hr' },
    });

    const userIvan = await this.userRepository.findOne({
      where: { email: 'ivan.skorupan@fer.hr' },
    });

    const userKarlo = await this.userRepository.findOne({
      where: { email: 'karlo.cihlar@fer.hr' },
    });

    const userLara = await this.userRepository.findOne({
      where: { email: 'lara.granosa@fer.hr' },
    });

    await this.seedFilipLessons(userFilip);
    await this.seedIvanLessons(userIvan);

    const lessonToResolve1 = await this.lessonsService.createLesson(
      userFilip,
      filipLessonsToResolve[0].lesson,
      filipLessonsToResolve[0].subjectName
    );

    const lessonToResolve2 = await this.lessonsService.createLesson(
      userFilip,
      filipLessonsToResolve[1].lesson,
      filipLessonsToResolve[1].subjectName
    );

    const tutorRes1 = await this.seedTutorResponse(
      userKarlo,
      lessonToResolve1.id,
      tutorResponses[0]
    );

    const tutorRes2 = await this.seedTutorResponse(
      userLara,
      lessonToResolve2.id,
      tutorResponses[1]
    );

    await this.resolveLessonRequest(
      userFilip,
      lessonToResolve1.id,
      tutorRes1.id
    );

    await this.resolveLessonRequest(
      userFilip,
      lessonToResolve2.id,
      tutorRes2.id
    );

    await this.completeLesson(userFilip, lessonToResolve2.id);
    await this.rateLesson(lessonToResolve2.id, 5, 'Filip was amazing!!!');
  }

  private async seedFilipLessons(user: User) {
    await Promise.all(
      filipLessons.map(async ({ lesson, subjectName }) => {
        await this.lessonsService.createLesson(user, lesson, subjectName);
      })
    );
  }

  private async seedIvanLessons(user: User) {
    await Promise.all(
      ivanLessons.map(async ({ lesson, subjectName }) => {
        await this.lessonsService.createLesson(user, lesson, subjectName);
      })
    );
  }

  private async seedTutorResponse(
    user: User,
    lessonId: number,
    tutorResponse: CreateTutorResponseDto
  ): Promise<TutorResponse> {
    return await this.tutorResponsesService.createTutorResponse(
      user,
      lessonId,
      tutorResponse
    );
  }

  private async resolveLessonRequest(
    user: User,
    lessonId: number,
    tutorResponseId: number
  ) {
    await this.lessonsService.resolveLessonRequest(
      user,
      lessonId,
      tutorResponseId
    );
  }

  private async completeLesson(user: User, lessonId: number) {
    await this.lessonsService.completeLesson(user, lessonId);
  }

  private async rateLesson(
    lessonId: number,
    studentRating: number,
    tutorFeedback: string
  ) {
    await this.ratingsService.rateLesson(lessonId, { studentRating });
    await this.ratingsService.leaveFeedback(lessonId, {
      tutorFeedback,
    });
  }
}
