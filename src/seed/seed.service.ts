import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { UserRepository } from '../auth/user.repository';
import { SubjectRepository } from '../lessons/subjects/subject.repository';
import { subjects } from './data/subjects';
import { LessonsService } from '../lessons/lessons.service';
import { admins, students, tutors } from './data/users';
import { filipLessons, ivanLessons } from './data/lessons';
import { tutorResponses } from './data/tutorResponses';
import { TutorResponsesService } from '../tutor-responses/tutor-responses.service';
import { RatingsService } from '../ratings/ratings.service';

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
    await this.seedTutorResponses();
    await this.resolveLessonRequests();
    await this.completeLessons();
    await this.rateLessons();

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
        await this.userRepository.register(admin, true);
      })
    );
  }

  private async seedStudents() {
    await Promise.all(
      students.map(async (student) => {
        await this.userRepository.register(student, false);
      })
    );
  }

  private async seedTutors() {
    await Promise.all(
      tutors.map(async (tutor) => {
        await this.userRepository.register(tutor, false);
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
    await this.seedFilipLessons();
    await this.seedIvanLessons();
  }

  private async seedFilipLessons() {
    const userFilip = await this.userRepository.findOne({
      where: { email: 'filip.todoric@fer.hr' },
    });

    await Promise.all(
      filipLessons.map(async (lesson) => {
        await this.lessonsService.createLesson(userFilip, lesson);
      })
    );
  }

  private async seedIvanLessons() {
    const userIvan = await this.userRepository.findOne({
      where: { email: 'ivan.skorupan@fer.hr' },
    });

    await Promise.all(
      ivanLessons.map(async (lesson) => {
        await this.lessonsService.createLesson(userIvan, lesson);
      })
    );
  }

  private async seedTutorResponses() {
    const userKarlo = await this.userRepository.findOne({
      where: { email: 'karlo.cihlar@fer.hr' },
    });

    await this.tutorResponsesService.createTutorResponse(
      userKarlo,
      1,
      tutorResponses[0]
    );

    const userLara = await this.userRepository.findOne({
      where: { email: 'lara.granosa@fer.hr' },
    });

    await this.tutorResponsesService.createTutorResponse(
      userLara,
      2,
      tutorResponses[1]
    );
  }

  private async resolveLessonRequests() {
    const userFilip = await this.userRepository.findOne({
      where: { email: 'filip.todoric@fer.hr' },
    });

    await this.lessonsService.resolveLessonRequest(userFilip, 1, 1);
    await this.lessonsService.resolveLessonRequest(userFilip, 2, 2);
  }

  private async completeLessons() {
    const userFilip = await this.userRepository.findOne({
      where: { email: 'filip.todoric@fer.hr' },
    });

    await this.lessonsService.completeLesson(userFilip, 2);
  }

  private async rateLessons() {
    const userFilip = await this.userRepository.findOne({
      where: { email: 'filip.todoric@fer.hr' },
    });

    await this.ratingsService.rateLesson(2, { studentRating: 5 });

    const userLara = await this.userRepository.findOne({
      where: { email: 'lara.granosa@fer.hr' },
    });

    await this.ratingsService.leaveFeedback(2, {
      tutorFeedback: 'Filip was amazing!!!',
    });
  }
}
