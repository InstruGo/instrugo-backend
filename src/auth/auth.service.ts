import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user.role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async register(
    registrationCredentialsDto: RegistrationCredentialsDto
  ): Promise<void> {
    const { password, confirmPassword, phone, isTutor } =
      registrationCredentialsDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    if (isTutor && !phone) {
      throw new BadRequestException('Phone is required for tutors.');
    }

    return this.userRepository.register(registrationCredentialsDto);
  }

  async login(
    loginCredentialsDto: LoginCredentialsDto
  ): Promise<{ accessToken: string }> {
    const { id, email, role } = await this.userRepository.validateUserPassword(
      loginCredentialsDto
    );

    if (!email) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload: JwtPayload = { id, email, role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async getProfile(id: number): Promise<Partial<User>> {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async becomeATutor(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist.`);
    }

    if (user.role !== UserRole.STUDENT) {
      throw new BadRequestException('You are already a tutor.');
    }

    return this.userRepository.becomeATutor(user);
  }
}
