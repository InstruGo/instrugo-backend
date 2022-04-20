import { CreateLessonDto } from '../../../lessons/dto/lessons/create-lesson.dto';
import { EducationLevel } from '../../../lessons/entities/lesson.education-level.enum';
import { MeetingType } from '../../../lessons/entities/lesson.meeting-type.enum';

export const ivanLessons: CreateLessonDto[] = [
  {
    subfield: 'Fractions',
    educationLevel: EducationLevel.ELEMENTARY_SCHOOL,
    grade: 5,
    description: 'I need a lot of help with fractions, pls halp',
    type: MeetingType.IN_PERSON,
    location: 'Zagreb, Croatia',
    duration: 60,
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
    subfield: 'Planets',
    educationLevel: EducationLevel.ELEMENTARY_SCHOOL,
    grade: 5,
    description: 'What is the universe?',
    type: MeetingType.IN_PERSON,
    location: 'Zagreb, Croatia',
    duration: 60,
    budget: 60,
    subjectId: 5,
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
    subfield: 'Logo',
    educationLevel: EducationLevel.ELEMENTARY_SCHOOL,
    grade: 5,
    description: 'Programming is so hard with turtles :(',
    type: MeetingType.ONLINE,
    location: 'Discord',
    duration: 60,
    budget: 70,
    subjectId: 10,
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
    subfield: 'Cells',
    educationLevel: EducationLevel.ELEMENTARY_SCHOOL,
    grade: 5,
    description: 'Eucaryotic cell is so complex',
    type: MeetingType.IN_PERSON,
    location: 'Zagreb, Croatia',
    duration: 60,
    budget: 55,
    subjectId: 6,
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
    subfield: 'Rational numbers',
    educationLevel: EducationLevel.ELEMENTARY_SCHOOL,
    grade: 5,
    description: 'Math again... :/',
    type: MeetingType.IN_PERSON,
    location: 'Zagreb, Croatia',
    duration: 60,
    budget: 45,
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
