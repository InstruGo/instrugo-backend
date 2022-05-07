import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleTokenVerificationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}
