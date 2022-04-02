import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  UseGuards,
  Request,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { User } from './user.decorator';
import { User as UserEntity } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Route for user registration.
   */
  @Post('/register')
  @ApiResponse({ status: 201 })
  register(
    @Body(ValidationPipe) registrationCredentialsDto: RegistrationCredentialsDto
  ): Promise<void> {
    return this.authService.register(registrationCredentialsDto);
  }

  /**
   * Route for user login.
   */
  @Post('/login')
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  login(
    @Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginCredentialsDto);
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

  /**
   * Route for converting a normal user to tutor status.
   */
  @Post('/become-a-tutor')
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthGuard, RolesGuard)
  becomeATutor(@User('id', ParseIntPipe) id: number): Promise<void> {
    return this.authService.becomeATutor(id);
  }
}
