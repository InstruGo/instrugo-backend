import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { TutorResponseTimeFrame } from './tutor-response-time-frame.entity';

@Entity()
export class TutorResponse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  lesson: Lesson;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  tutor: User;

  @OneToMany(() => TutorResponseTimeFrame, (trtf) => trtf.tutorResponse, {
    eager: true,
  })
  tutorResponseTimeFrames: TutorResponseTimeFrame[];
}
