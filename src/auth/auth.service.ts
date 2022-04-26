import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { SubjectRepository } from 'src/lessons/subjects/subject.repository';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';
import { User } from './entities/user.entity';
import { Subject } from '../lessons/entities/subject.entity';
import { UserRole } from './entities/user.role.enum';
import { UpdateProfileDto } from './dto/profile-update.dto';
import { StudentPublicProfileDto } from './dto/student-public-profile.dto';
import { TutorPublicProfileDto } from './dto/tutor-public-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
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

  async getPublicProfileById(id: number) {
    const profile = await this.userRepository.findOne({ id });

    let reducedProfile = null;
    if (profile.role === UserRole.STUDENT) {
      reducedProfile = StudentPublicProfileDto.fromUserEntity(profile);
    } else {
      reducedProfile = TutorPublicProfileDto.fromUserEntity(profile);
    }

    return reducedProfile;
  }

  async updateProfile(
    user: User,
    updateProfileDto: UpdateProfileDto
  ): Promise<void> {
    const subjects: Subject[] = [];

    updateProfileDto.subjectIds?.map(async (id) => {
      const subject = await this.subjectRepository.findOne(id);
      if (subject) subjects.push(subject);
    });

    return this.userRepository.updateProfile(user, updateProfileDto, subjects);
  }

  async becomeATutor(user: User): Promise<void> {
    if (user.role !== UserRole.STUDENT) {
      throw new BadRequestException('You are already a tutor.');
    }

    return this.userRepository.becomeATutor(user);
  }
}
