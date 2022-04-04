import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { LessonTimeFrame } from '../../lessons/entities/lesson-time-frame.entity';

@Entity()
export class TutorResponse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  lesson: Lesson;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  tutor: User;

  @ManyToMany(() => LessonTimeFrame, {
    eager: true,
  })
  tutorResponseTimeFrames: LessonTimeFrame[];
}
