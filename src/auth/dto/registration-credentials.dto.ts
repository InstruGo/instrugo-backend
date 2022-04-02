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
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  confirmPassword: string;

  @IsBoolean()
  isTutor: boolean;
}
