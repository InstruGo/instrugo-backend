import { EducationLevel } from '../../lessons/entities/lesson.level.enum';
import { MeetingType } from '../../lessons/entities/lesson.meeting-type.enum';
import { CreateLessonDto } from '../../lessons/dto/lessons/create-lesson.dto';

export const lessons: CreateLessonDto[] = [
  {
    subfield: 'fractions',
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
  {
    subfield: 'dynamics',
    level: EducationLevel.HIGH,
    grade: 1,
    description: 'Teacher is really bad, pls teach me dynamics',
    type: MeetingType.ONLINE,
    location: 'Microsoft Teams',
    budget: 60,
    subjectId: 2,
    lessonTimeFrames: [
      {
        startTime: '2022-06-01T13:30Z',
        endTime: '2022-06-01T14:30Z',
      },
      {
        startTime: '2022-06-02T10:15Z',
        endTime: '2022-06-02T12:15Z',
      },
    ],
  },
  {
    subfield: 'past tense',
    level: EducationLevel.HIGH,
    grade: 1,
    description: 'English is not my favourite subject...',
    type: MeetingType.IRL,
    location: 'Travanjska 11, Zagreb',
    budget: 50,
    subjectId: 4,
    lessonTimeFrames: [
      {
        startTime: '2022-06-25T14:00Z',
        endTime: '2022-06-25T15:00Z',
      },
      {
        startTime: '2022-06-25T10:15Z',
        endTime: '2022-06-25T12:15Z',
      },
    ],
  },
];
