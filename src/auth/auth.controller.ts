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
  ParseIntPipe,
  Patch,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
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

  @Get('/profile')
  @ApiResponse({ status: 200 })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getProfile(
    @User('id', ParseIntPipe) id: number
  ): Promise<Partial<UserEntity>> {
    return this.authService.getProfile(id);
  }

  @Patch('/profile')
  @ApiResponse({ status: 200 })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateProfile(
    @User('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto
  ): Promise<void> {
    return this.authService.updateProfile(id, updateProfileDto);
  }

  @Post('/become-a-tutor')
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthGuard, RolesGuard)
  becomeATutor(@User('id', ParseIntPipe) id: number): Promise<void> {
    return this.authService.becomeATutor(id);
  }
}
