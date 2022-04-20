import { RegistrationCredentialsDto } from '../../../auth/dto/registration-credentials.dto';
import { EducationLevel } from '../../../lessons/entities/lesson.level.enum';

export const students: RegistrationCredentialsDto[] = [
  {
    email: 'ivan.skorupan@fer.hr',
    firstName: 'Ivan',
    lastName: 'Skorupan',
    phone: '+385992667419',
    birthDate: '19-06-1998',
    description:
      "I'm a silly student that doesn't really know what to do with life :)",
    educationLevel: EducationLevel.ELEMENTARY,
    grade: 5,
    password: 'frle10',
    confirmPassword: 'frle10',
    isTutor: false,
  },
  {
    email: 'filip.todoric@fer.hr',
    firstName: 'Filip',
    lastName: 'Todorić',
    phone: '',
    password: 'fico98',
    confirmPassword: 'fico98',
    isTutor: false,
  },
  {
    email: 'ivko.ivkic@fer.hr',
    firstName: 'Ivko',
    lastName: 'Ivkić',
    phone: '+385998321457',
    password: 'ifkec72',
    confirmPassword: 'ifkec72',
    isTutor: false,
  },
  {
    email: 'pero.perica@fer.hr',
    firstName: 'Pero',
    lastName: 'Perica',
    phone: '+385998321457',
    password: 'pero22',
    confirmPassword: 'pero22',
    isTutor: false,
  },
  {
    email: 'stef.stefek@fer.hr',
    firstName: 'Štef',
    lastName: 'Štefek',
    phone: '+385998321457',
    password: 'stef11',
    confirmPassword: 'stef11',
    isTutor: false,
  },
];
