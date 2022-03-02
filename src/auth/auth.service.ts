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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(
    registrationCredentialsDto: RegistrationCredentialsDto
  ): Promise<void> {
    const { password, confirmPassword } = registrationCredentialsDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('passwords do not match');
    }

    return this.userRepository.signUp(registrationCredentialsDto);
  }

  async signIn(
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
}
