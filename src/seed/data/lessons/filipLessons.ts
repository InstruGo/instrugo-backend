import { CreateLessonDto } from '../../../lessons/dto/lessons/create-lesson.dto';
import { EducationLevel } from '../../../lessons/entities/lesson.level.enum';
import { MeetingType } from '../../../lessons/entities/lesson.meeting-type.enum';

export const filipLessons: CreateLessonDto[] = [
  {
    subfield: 'Dynamics',
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
    subfield: 'Past Tense',
    level: EducationLevel.HIGH,
    grade: 1,
    description: 'English is not my favourite subject...',
    type: MeetingType.IRL,
    location: 'Travanjska 11, Zagreb',
    budget: 100,
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
  {
    subfield: 'Python Lists',
    level: EducationLevel.HIGH,
    grade: 1,
    description: 'Python is dead to me',
    type: MeetingType.IRL,
    location: 'Travanjska 11, Zagreb',
    budget: 35,
    subjectId: 10,
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
  {
    subfield: 'Set Theory',
    level: EducationLevel.HIGH,
    grade: 1,
    description: 'Sets go brrrr...',
    type: MeetingType.IRL,
    location: 'Travanjska 11, Zagreb',
    budget: 52,
    subjectId: 1,
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
  {
    subfield: 'Lorem Ipsum',
    level: EducationLevel.HIGH,
    grade: 1,
    description: 'Latin is a dead language',
    type: MeetingType.IRL,
    location: 'Travanjska 11, Zagreb',
    budget: 67,
    subjectId: 8,
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
