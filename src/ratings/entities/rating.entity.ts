import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
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
  @JoinColumn()
  lesson: Lesson;

  @ManyToOne(() => User)
  student: User;

  @ManyToOne(() => User)
  tutor: User;
}
