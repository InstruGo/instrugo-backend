import { IsNotEmpty, IsString, IsInt, IsIn, IsPositive } from 'class-validator';

import { EducationLevel } from '../../entities/lesson.level.enum';
import { MeetingType } from '../../entities/lesson.meeting-type.enum';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  subfield: string;

  @IsNotEmpty()
  @IsIn(Object.values(EducationLevel))
  level: EducationLevel;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  grade: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsIn(Object.values(MeetingType))
  type: MeetingType;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsPositive()
  budget: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  subjectId: number;
}
