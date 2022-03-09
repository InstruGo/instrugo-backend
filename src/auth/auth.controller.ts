import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';

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
}
