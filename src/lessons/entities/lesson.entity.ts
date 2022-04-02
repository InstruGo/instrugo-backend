import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EducationLevel } from './lesson.level.enum';
import { MeetingType } from './lesson.meeting-type.enum';
import { LessonStatus } from './lesson.status.enum';
import { User } from '../../auth/entities/user.entity';
import { Subject } from './subject.entity';
import { LessonTimeFrame } from './lesson-time-frame.entity';
import { TutorResponse } from '../../tutor-responses/entities/tutor-response.entity';

@Entity()
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subfield: string;

  @Column()
  level: EducationLevel;

  @Column()
  grade: number;

  @Column()
  description: string;

  @Column()
  type: MeetingType;

  @Column()
  location: string;

  @Column('numeric')
  budget: number;

  @Column()
  status: LessonStatus;

  @Column('timestamptz')
  startTime: Date;

  @Column('timestamptz')
  endTime: Date;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  modifiedOn: Date;

  @ManyToOne(() => User, { eager: true })
  student: User;

  @ManyToOne(() => User, { eager: true })
  tutor: User;

  @ManyToOne(() => Subject, { eager: true })
  subject: Subject;

  @OneToMany(() => LessonTimeFrame, (ltf) => ltf.lesson, { eager: true })
  lessonTimeFrames: LessonTimeFrame[];

  @OneToMany(() => TutorResponse, (tr) => tr.lesson, { eager: true })
  tutorResponses: TutorResponse[];
}
