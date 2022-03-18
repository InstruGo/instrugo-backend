import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}
