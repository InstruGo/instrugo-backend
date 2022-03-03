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

  @Post('/signup')
  @ApiResponse({ status: 201 })
  signUp(
    @Body(ValidationPipe) registrationCredentialsDto: RegistrationCredentialsDto
  ): Promise<void> {
    return this.authService.signUp(registrationCredentialsDto);
  }

  /**
   * Route for user login.
   */
  @Post('/signin')
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  signIn(
    @Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginCredentialsDto);
  }
}
