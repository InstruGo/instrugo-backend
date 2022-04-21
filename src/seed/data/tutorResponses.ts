import { CreateTutorResponseDto } from '../../tutor-responses/dto/create-tutor-response.dto';

export const tutorResponses: CreateTutorResponseDto[] = [
  {
    price: 55,
    tutorTimeFrame: {
      startTime: '2022-06-01T13:30Z',
      endTime: '2022-06-01T14:30Z',
    },
  },
  {
    price: 70,
    tutorTimeFrame: {
      startTime: '2022-06-25T10:15Z',
      endTime: '2022-06-25T12:15Z',
    },
  },
];
