import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  modifiedOn: Date;

  @ManyToMany(() => Subject, { eager: true })
  @JoinTable()
  subjects: Subject[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  addRatingAndUpdateRatingsCount(value: number) {
    const { averageRating, ratingsCount } = this;

    this.averageRating =
      (ratingsCount * averageRating + value) / (ratingsCount + 1);
    this.ratingsCount = ratingsCount + 1;
  }

  updateRating(valueToUpdate: number, newValue: number) {
    const { averageRating, ratingsCount } = this;

    this.averageRating =
      (ratingsCount * averageRating - valueToUpdate + newValue) / ratingsCount;
  }

  deleteRatingAndUpdateRatingsCount(value: number) {
    const { averageRating, ratingsCount } = this;

    if (ratingsCount === 1) {
      this.averageRating = 0;
    } else {
      this.averageRating =
        (ratingsCount * averageRating - value) / (ratingsCount - 1);
    }

    this.ratingsCount = ratingsCount - 1;
  }
}
