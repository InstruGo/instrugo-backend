import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Patch,
  Res,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './user.decorator';
import { User as UserEntity } from './entities/user.entity';
import { UpdateProfileDto } from './dto/profile-update.dto';
import { JwtPayload } from './jwt-payload.interface';
import { GoogleTokenVerificationDto } from './dto/google-token-verification.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('/login/google')
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  async loginWithGoogle(
    @Body(ValidationPipe)
    googleTokenVerificationDto: GoogleTokenVerificationDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.authService.loginWithGoogle(
      googleTokenVerificationDto.token
    );

    res.cookie('jwt', token, { httpOnly: true });
    return { msg: 'success' };
  }

  @Post('/register')
  @ApiResponse({ status: 201 })
  register(
    @Body() registrationCredentialsDto: RegistrationCredentialsDto
  ): Promise<void> {
    return this.authService.register(registrationCredentialsDto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  async login(
    @Body() loginCredentialsDto: LoginCredentialsDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.authService.login(loginCredentialsDto);

    res.cookie('jwt', token, { httpOnly: true });
    return { msg: 'success' };
  }

  @Post('/logout')
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', { httpOnly: true });
    return { msg: 'success' };
  }

  @Get('/profile/:id')
  @ApiResponse({ status: 200 })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  getPublicProfileById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getPublicProfileById(id);
  }

  @Get('/profile')
  @ApiResponse({ status: 200 })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  getPersonalProfile(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Patch('/profile')
  @ApiResponse({ status: 200 })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  updatePersonalProfile(
    @User() user: UserEntity,
    @Body() updateProfileDto: UpdateProfileDto
  ): Promise<UserEntity> {
    return this.authService.updateProfile(user, updateProfileDto);
  }

  @Post('/become-a-tutor')
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthGuard)
  async becomeATutor(
    @User() user: UserEntity,
    @Res({ passthrough: true }) res: Response
  ): Promise<UserEntity> {
    const updatedUser = await this.authService.becomeATutor(user);

    const payload: JwtPayload = {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
    };
    const accessToken = this.jwtService.sign(payload);

    res.cookie('jwt', { accessToken }, { httpOnly: true });
    return user;
  }
}
