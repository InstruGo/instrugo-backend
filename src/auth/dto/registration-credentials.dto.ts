import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsISO8601,
  IsInt,
  IsPositive,
  IsNotEmpty,
  IsIn,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

import { EducationLevel } from '../../lessons/entities/lesson.level.enum';

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

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(EducationLevel))
  @ApiPropertyOptional({ enum: EducationLevel, enumName: 'EducationLevel' })
  educationLevel?: EducationLevel;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional()
  grade?: number;

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
