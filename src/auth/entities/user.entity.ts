import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsIn } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { UserRole } from './user.role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
  @IsIn(Object.values(UserRole))
  role: UserRole;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column('date')
  createdOn: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
