import { IsNotEmpty, IsInt, IsPositive, IsOptional } from 'class-validator';

export class UpdateRatingDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  rating?: number;
}
