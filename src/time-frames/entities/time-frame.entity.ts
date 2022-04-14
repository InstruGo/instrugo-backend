import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
export class TimeFrame extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamptz')
  startTime: Date;

  @Column('timestamptz')
  endTime: Date;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonTimeFrames, {
    onDelete: 'CASCADE',
  })
  lesson: Lesson;

  isBetweenDates(begin: Date, end: Date) {
    return this.startTime >= begin && this.endTime <= end;
  }

  isAfterDate(after: Date) {
    return this.startTime >= after;
  }

  isBeforeDate(before: Date) {
    return this.endTime <= before;
  }
}
