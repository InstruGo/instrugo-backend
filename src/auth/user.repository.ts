import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { UserRole } from './entities/user.role.enum';
import { JwtPayload } from './jwt-payload.interface';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(
    registrationCredentialsDto: RegistrationCredentialsDto
  ): Promise<void> {
    const { email, firstName, lastName, phone, password, isTutor } =
      registrationCredentialsDto;

    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.role = isTutor ? UserRole.TUTOR : UserRole.STUDENT;
    user.createdOn = new Date(new Date().toISOString());

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
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
