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
import { ColumnNumericTransformer } from '../column-numeric.transformer';

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

  @Column()
  duration: number;

  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  budget: number;

  @Column()
  status: LessonStatus;

  @Column('timestamptz', { nullable: true })
  finalStartTime: Date;

  @Column('timestamptz', { nullable: true })
  finalEndTime: Date;

  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
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

  hasTimeSlotBetweenDates(begin: Date, end: Date) {
    for (const timeFrame of this.lessonTimeFrames) {
      if (timeFrame.isBetweenDates(begin, end)) {
        return true;
      }
    }

    return false;
  }

  hasTimeSlotAfterDate(after: Date) {
    for (const timeFrame of this.lessonTimeFrames) {
      if (timeFrame.isAfterDate(after)) {
        return true;
      }
    }

    return false;
  }

  hasTimeSlotBeforeDate(before: Date) {
    for (const timeFrame of this.lessonTimeFrames) {
      if (timeFrame.isBeforeDate(before)) {
        return true;
      }
    }

    return false;
  }
}
