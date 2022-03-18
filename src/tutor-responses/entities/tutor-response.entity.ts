import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
export class TutorResponse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double precision')
  price: number;

  @ManyToOne(() => Lesson, { eager: true })
  lesson: Lesson;

  @ManyToOne(() => User, { eager: true })
  tutor: User;
}
