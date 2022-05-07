import { CreateLessonDto } from '../../../lessons/dto/lessons/create-lesson.dto';

export type LessonSeed = {
  lesson: CreateLessonDto;
  subjectName: string;
};
