import {
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	Entity,
} from 'typeorm';

import { EducationLevel } from './lesson.level.enum';
import { MeetingType } from './lesson.meeting_type.enum';
import { LessonStatus } from './lesson.status.enum';

@Entity()
export class Lesson extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	subfield: string;

	@Column()
	level: EducationLevel;

	@Column()
	grade: number;

    @Column()
    description: string;

	@Column()
	type: MeetingType;

	@Column()
	location: string;

    @Column('decimal')
	budget: number;

    @Column()
	status: LessonStatus;

    @Column('date')
	createdOn: Date;

    @Column('date')
	lastModifiedOn: Date;

    @Column()
	ownerId: number;

    @Column()
	subjectId: number;

}
