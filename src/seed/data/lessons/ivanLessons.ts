import { CreateLessonDto } from '../../../lessons/dto/lessons/create-lesson.dto';
import { EducationLevel } from '../../../lessons/entities/lesson.level.enum';
import { MeetingType } from '../../../lessons/entities/lesson.meeting-type.enum';

export const ivanLessons: CreateLessonDto[] = [
  {
    subfield: 'Fractions',
    level: EducationLevel.ELEMENTARY,
    grade: 5,
    description: 'I need a lot of help with fractions, pls halp',
    type: MeetingType.IRL,
    location: 'Zagreb, Croatia',
    budget: 50,
    subjectId: 1,
    lessonTimeFrames: [
      {
        startTime: '2022-06-19T15:30Z',
        endTime: '2022-06-19T16:30Z',
      },
      {
        startTime: '2022-06-20T10:00Z',
        endTime: '2022-06-20T12:00Z',
      },
    ],
  },
];
