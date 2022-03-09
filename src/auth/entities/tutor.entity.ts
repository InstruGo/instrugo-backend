import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from './user.entity';
import { Subject } from '../../lessons/entities/subject.entity';

@Entity()
export class Tutor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double precision')
  averageRating: number;

  @Column()
  ratingsCount: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];
}
