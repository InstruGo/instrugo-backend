import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';
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

  @IsOptional()
  @IsISO8601()
  @ApiPropertyOptional()
  birthDate?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description?: string;

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
