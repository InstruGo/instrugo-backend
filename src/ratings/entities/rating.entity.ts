import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentRating: number;

  @Column()
  tutorFeedback: string;

  @OneToOne(() => Lesson)
  @JoinColumn()
  lesson: Lesson;

  @ManyToOne(() => User)
  student: User;

  @ManyToOne(() => User)
  tutor: User;
}
