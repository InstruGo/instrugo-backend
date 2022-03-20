import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { Lesson } from './lesson.entity';

@Entity()
export class LessonTimeFrame extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamptz')
  startTime: Date;

  @Column('timestamptz')
  endTime: Date;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonTimeFrames)
  lesson: Lesson;
}
