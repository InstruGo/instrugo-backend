import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { TimeFrame } from '../../time-frames/entities/time-frame.entity';

@Entity()
export class TutorResponse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  lesson: Lesson;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  tutor: User;

  @ManyToMany(() => TimeFrame, {
    eager: true,
  })
  tutorResponseTimeFrames: TimeFrame[];
}
