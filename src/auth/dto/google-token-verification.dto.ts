import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleTokenVerificationDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
