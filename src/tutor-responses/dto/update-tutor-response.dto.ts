import {
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLessonTimeFrameDto } from '../../lessons/dto/lesson-time-frames/create-lesson-time-frame.dto';

export class UpdateTutorResponseDto {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateLessonTimeFrameDto)
  tutorTimeFrames?: CreateLessonTimeFrameDto[];
}
