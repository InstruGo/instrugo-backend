import { CreateTutorResponseDto } from '../../tutor-responses/dto/create-tutor-response.dto';

export const tutorResponses: CreateTutorResponseDto[] = [
  {
    lessonId: 1,
    price: 55,
    tutorTimeFrame: {
      startTime: '2022-06-01T13:30Z',
      endTime: '2022-06-01T14:30Z',
    },
  },
];
