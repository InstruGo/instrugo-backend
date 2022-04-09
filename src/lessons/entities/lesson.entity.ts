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
import { TimeFrame } from '../../time-frames/entities/time-frame.entity';
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

  @Column('timestamptz', { nullable: true })
  finalStartTime: Date;

  @Column('timestamptz', { nullable: true })
  finalEndTime: Date;

  @Column('numeric', { nullable: true })
  finalPrice: number;

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

  @OneToMany(() => TimeFrame, (ltf) => ltf.lesson, { eager: true })
  lessonTimeFrames: TimeFrame[];

  @OneToMany(() => TutorResponse, (tr) => tr.lesson, { eager: true })
  tutorResponses: TutorResponse[];
}
