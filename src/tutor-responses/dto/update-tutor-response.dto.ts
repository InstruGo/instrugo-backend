import { IsOptional, IsPositive, IsDecimal, IsNotEmpty } from 'class-validator';

export class UpdateTutorResponseDto {
  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  @IsOptional()
  price: number;
}
