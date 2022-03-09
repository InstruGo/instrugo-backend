import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Subject } from '../../lessons/entities/subject.entity';

@Entity()
export class Tutor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double precision')
  averageRating: number;

  @Column()
  ratingsCount: number;

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];
}
