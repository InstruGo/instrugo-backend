import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class RegistrationCredentialsDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiPropertyOptional()
  phone?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty()
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty()
  confirmPassword: string;

  @IsBoolean()
  @ApiProperty()
  isTutor: boolean;
}
