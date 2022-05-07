import { EducationLevel } from '../../../lessons/entities/lesson.education-level.enum';
import { MeetingType } from '../../../lessons/entities/lesson.meeting-type.enum';
import { LessonSeed } from './lesson-seed.type';

export const filipLessons: LessonSeed[] = [
  {
    lesson: {
      subfield: 'Python Lists',
      educationLevel: EducationLevel.HIGH_SCHOOL,
      grade: 1,
      description: 'Python is dead to me',
      type: MeetingType.IN_PERSON,
      location: 'Travanjska 11, Zagreb',
      duration: 60,
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
    subjectName: 'IT',
  },
  {
    lesson: {
      subfield: 'Set Theory',
      educationLevel: EducationLevel.HIGH_SCHOOL,
      grade: 1,
      description: 'Sets go brrrr...',
      type: MeetingType.IN_PERSON,
      location: 'Travanjska 11, Zagreb',
      duration: 60,

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
    subjectName: 'math',
  },
  {
    lesson: {
      subfield: 'Lorem Ipsum',
      educationLevel: EducationLevel.HIGH_SCHOOL,
      grade: 1,
      description: 'Latin is a dead language',
      type: MeetingType.IN_PERSON,
      location: 'Travanjska 11, Zagreb',
      duration: 60,
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
    subjectName: 'latin',
  },
];

export const filipLessonsToResolve: LessonSeed[] = [
  {
    lesson: {
      subfield: 'Dynamics',
      educationLevel: EducationLevel.HIGH_SCHOOL,
      grade: 1,
      description: 'Teacher is really bad, pls teach me dynamics',
      type: MeetingType.ONLINE,
      location: 'Microsoft Teams',
      duration: 60,
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
    subjectName: 'physics',
  },
  {
    lesson: {
      subfield: 'Past Tense',
      educationLevel: EducationLevel.HIGH_SCHOOL,
      grade: 1,
      description: 'English is not my favourite subject...',
      type: MeetingType.IN_PERSON,
      location: 'Travanjska 11, Zagreb',
      duration: 60,
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
    subjectName: 'english',
  },
];
