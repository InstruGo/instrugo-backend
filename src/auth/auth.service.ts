import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async register(
    registrationCredentialsDto: RegistrationCredentialsDto
  ): Promise<void> {
    const { password, confirmPassword } = registrationCredentialsDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('passwords do not match');
    }

    return this.userRepository.register(registrationCredentialsDto);
  }

  async login(
    loginCredentialsDto: LoginCredentialsDto
  ): Promise<{ accessToken: string }> {
    const { id, email, firstName, lastName, role } =
      await this.userRepository.validateUserPassword(loginCredentialsDto);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { id, email, firstName, lastName, role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async becomeATutor(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist.`);
    }

    return this.userRepository.becomeATutor(user);
  }
}
