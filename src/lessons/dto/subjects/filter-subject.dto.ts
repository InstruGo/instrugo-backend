import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterSubjectDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}
