import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Route for user registration.
   */
  @Post('/signup')
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
  signIn(
    @Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginCredentialsDto);
  }
}
