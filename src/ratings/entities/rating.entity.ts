import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  studentRating: number;

  @Column({ nullable: true })
  tutorFeedback: string;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  modifiedOn: Date;

  @OneToOne(() => Lesson, { onDelete: 'CASCADE' })
  lesson: Lesson;
}
