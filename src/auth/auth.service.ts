import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { google, Auth } from 'googleapis';

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
  oauthClient: Auth.OAuth2Client;

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async loginWithGoogle(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    const email = tokenInfo.email;

    let user = await this.userRepository.findOne({ email });

    if (!user) {
      const userData = await this.getUserData(token);
      user = await this.userRepository.registerWithGoogle(userData);
    }

    return this.handleRegisteredUser(user);
  }

  private async handleRegisteredUser(user: User) {
    const { id, email, role } = user;

    const payload: JwtPayload = { id, email, role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  private async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }

  async register(
    registrationCredentialsDto: RegistrationCredentialsDto
  ): Promise<void> {
    const { password, confirmPassword, phone, subjectIds, isTutor } =
      registrationCredentialsDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    if (isTutor && !phone) {
      throw new BadRequestException('Phone is required for tutors.');
    }

    const subjects: Subject[] = [];

    await Promise.all(
      subjectIds?.map(async (id) => {
        const subject = await this.subjectRepository.findOne(id);

        if (subject) {
          subjects.push(subject);
        }
      })
    );

    return this.userRepository.register(registrationCredentialsDto, subjects);
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
  ): Promise<User> {
    const subjects: Subject[] = [];

    await Promise.all(
      updateProfileDto.subjectIds?.map(async (id) => {
        const subject = await this.subjectRepository.findOne(id);
        if (subject) subjects.push(subject);
      })
    );

    return this.userRepository.updateProfile(user, updateProfileDto, subjects);
  }

  async becomeATutor(user: User): Promise<User> {
    if (user.role !== UserRole.STUDENT) {
      throw new BadRequestException('You are already a tutor.');
    }

    return this.userRepository.becomeATutor(user);
  }
}
