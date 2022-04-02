import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { UserRole } from './user.role.enum';
import { Subject } from '../../lessons/entities/subject.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column()
  role: UserRole;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column('numeric')
  averageRating: number;

  @Column()
  ratingsCount: number;

  @Column('timestamptz')
  createdOn: Date;

  @Column('timestamptz')
  modifiedOn: Date;

  @ManyToMany(() => Subject, { eager: true })
  @JoinTable()
  subjects: Subject[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
