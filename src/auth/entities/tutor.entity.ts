import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';

import { Subject } from '../../lessons/entities/subject.entity';
import { User } from './user.entity';

@Entity()
export class Tutor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double precision')
  averageRating: number;

  @Column()
  ratingsCount: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];
}
