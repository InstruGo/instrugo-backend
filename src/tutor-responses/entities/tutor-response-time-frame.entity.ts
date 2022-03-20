import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { TutorResponse } from './tutor-response.entity';

@Entity()
export class TutorResponseTimeFrame extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamptz')
  startTime: Date;

  @Column('timestamptz')
  endTime: Date;

  @ManyToOne(
    () => TutorResponse,
    (tutorResponse) => tutorResponse.tutorResponseTimeFrames,
    { onDelete: 'CASCADE' }
  )
  tutorResponse: TutorResponse;
}
