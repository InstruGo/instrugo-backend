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
