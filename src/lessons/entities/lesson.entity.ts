import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { EducationLevel } from './lesson.level.enum';
import { MeetingType } from './lesson.meeting-type.enum';
import { LessonStatus } from './lesson.status.enum';
import { User } from '../../auth/entities/user.entity';
import { Subject } from './subject.entity';

@Entity()
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subfield: string;

  @Column()
  level: EducationLevel;

  @Column()
  grade: number;

  @Column()
  description: string;

  @Column()
  type: MeetingType;

  @Column()
  location: string;

  @Column('numeric')
  budget: number;

  @Column()
  status: LessonStatus;

  @Column('date')
  createdOn: Date;

  @Column('date')
  lastModifiedOn: Date;

  @ManyToOne(() => User)
  owner: User;

  @ManyToOne(() => Subject)
  subject: Subject;
}
