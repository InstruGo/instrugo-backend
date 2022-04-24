import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  Column,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { TimeFrame } from '../../time-frames/entities/time-frame.entity';
import { ColumnNumericTransformer } from '../../lessons/column-numeric.transformer';

@Entity()
export class TutorResponse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  lesson: Lesson;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  tutor: User;

  @ManyToOne(() => TimeFrame, {
    eager: true,
  })
  tutorResponseTimeFrame: TimeFrame;
}
