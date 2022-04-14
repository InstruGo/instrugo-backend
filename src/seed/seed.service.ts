import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { UserRepository } from '../auth/user.repository';
import { SubjectRepository } from '../lessons/subjects/subject.repository';
import { LessonRepository } from '../lessons/lesson.repository';
import { RatingRepository } from '../ratings/rating.repository';
import { TimeFrameRepository } from '../time-frames/time-frames.repository';
import { TutorResponseRepository } from '../tutor-responses/tutor-responses.repository';
import { admins, tutors, students } from './data/users';
import { subjects } from './data/subjects';
import { lessons } from './data/lessons';
import { LessonsService } from '../lessons/lessons.service';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private configService: ConfigService,
    @InjectConnection() private readonly connection: Connection,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    @InjectRepository(RatingRepository)
    private ratingRepository: RatingRepository,
    @InjectRepository(TutorResponseRepository)
    private tutorResponseRepository: TutorResponseRepository,
    @InjectRepository(TimeFrameRepository)
    private timeFrameRepository: TimeFrameRepository,
    private readonly lessonsService: LessonsService
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
    const student1 = await this.userRepository.findOne({
      where: { email: 'filip.todoric@fer.hr' },
    });

    const student2 = await this.userRepository.findOne({
      where: { email: 'ivan.skorupan@fer.hr' },
    });

    await this.lessonsService.createLesson(student1, lessons[0]);
    await this.lessonsService.createLesson(student2, lessons[1]);
    await this.lessonsService.createLesson(student2, lessons[2]);
  }
}
