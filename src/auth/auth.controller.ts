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
  BadRequestException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './user.decorator';
import { User as UserEntity } from './entities/user.entity';
import { UpdateProfileDto } from './dto/profile-update.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiResponse({ status: 201 })
  register(
    @Body(ValidationPipe) registrationCredentialsDto: RegistrationCredentialsDto
  ): Promise<void> {
    return this.authService.register(registrationCredentialsDto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  async loginJwtCookie(
    @Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto,
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
  getProfileById(
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) id: number
  ) {
    if (user.id === id) {
      throw new BadRequestException(
        'You cannot look up your own public profile.'
      );
    }

    return this.authService.getProfileById(user, id);
  }

  @Get('/profile')
  @ApiResponse({ status: 200 })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  getProfile(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Patch('/profile')
  @ApiResponse({ status: 200 })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  updateProfile(
    @User() user: UserEntity,
    @Body() updateProfileDto: UpdateProfileDto
  ): Promise<void> {
    return this.authService.updateProfile(user, updateProfileDto);
  }

  @Post('/become-a-tutor')
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthGuard)
  becomeATutor(@User() user: UserEntity): Promise<void> {
    return this.authService.becomeATutor(user);
  }
}
