import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Subject } from 'src/lessons/entities/subject.entity';
import { UserRole } from './entities/user.role.enum';
import { JwtPayload } from './jwt-payload.interface';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';
import { UpdateProfileDto } from './dto/profile-update.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(
    registrationCredentialsDto: RegistrationCredentialsDto,
    isAdmin?: boolean
  ): Promise<void> {
    const {
      email,
      firstName,
      lastName,
      phone,
      birthDate,
      description,
      educationLevel,
      grade,
      password,
      isTutor,
    } = registrationCredentialsDto;

    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.birthDate = birthDate ? new Date(birthDate) : null;
    user.description = description;
    user.educationLevel = educationLevel;
    user.grade = grade;

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    if (isAdmin) {
      user.role = UserRole.ADMIN;
    } else {
      user.role = isTutor ? UserRole.TUTOR : UserRole.STUDENT;
    }

    if (user.role === UserRole.TUTOR || user.role === UserRole.ADMIN) {
      user.averageRating = 0;
      user.ratingsCount = 0;
    }

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    loginCredentialsDto: LoginCredentialsDto
  ): Promise<JwtPayload> {
    const { email, password } = loginCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    } else {
      return {
        id: null,
        email: null,
        role: null,
      };
    }
  }

  async updateProfile(
    user: User,
    updateProfileDto: UpdateProfileDto,
    subjects: Subject[]
  ): Promise<void> {
    const {
      firstName,
      lastName,
      phone,
      birthDate,
      description,
      educationLevel,
      grade,
    } = updateProfileDto;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (birthDate) user.birthDate = new Date(birthDate);
    if (description) user.description = description;
    if (educationLevel) user.educationLevel = educationLevel;
    if (grade) user.grade = grade;
    if (subjects) user.subjects = subjects;

    await user.save();
  }

  async becomeATutor(user: User): Promise<void> {
    user.averageRating = 0;
    user.ratingsCount = 0;
    user.role = UserRole.TUTOR;

    await user.save();
  }

  private hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
