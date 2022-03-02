import {
	IsNotEmpty,
	IsString,
    IsInt,
	IsIn,
	IsOptional,
    IsDecimal,
} from 'class-validator';

import { EducationLevel } from '../entities/lesson.level.enum';
import { MeetingType } from '../entities/lesson.meeting_type.enum';

export class CreateLessonDto {
    @IsNotEmpty()
	@IsString()
	subfield: string;

	@IsNotEmpty()
	@IsIn(Object.values(EducationLevel))
	level: EducationLevel;

    @IsNotEmpty()
	@IsInt() 
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
	@IsDecimal() 
    budget: number;

    @IsNotEmpty()
	@IsInt() 
	subjectId: number;
}
