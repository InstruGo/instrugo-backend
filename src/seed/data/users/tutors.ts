import { RegistrationCredentialsDto } from '../../../auth/dto/registration-credentials.dto';

export const tutors: RegistrationCredentialsDto[] = [
  {
    email: 'karlo.cihlar@fer.hr',
    firstName: 'Karlo',
    lastName: 'Cihlar',
    phone: '+385921234567',
    password: 'cihach',
    confirmPassword: 'cihach',
    isTutor: true,
  },
  {
    email: 'lara.granosa@fer.hr',
    firstName: 'Lara',
    lastName: 'Granoša',
    phone: '+385917654321',
    password: 'diskobanana',
    confirmPassword: 'diskobanana',
    isTutor: true,
  },
  {
    email: 'tutor.tutorich@fer.hr',
    firstName: 'Tutor',
    lastName: 'Tutorić',
    phone: '+385917654321',
    password: 'tutor',
    confirmPassword: 'tutor',
    isTutor: true,
  },
  {
    email: 'natrijev.klorid@fer.hr',
    firstName: 'Natrij',
    lastName: 'Klorid',
    phone: '+385917654321',
    password: 'klorid',
    confirmPassword: 'klorid',
    isTutor: true,
  },
  {
    email: 'gospon.covjek@fer.hr',
    firstName: 'Gospodin',
    lastName: 'Čovjek',
    phone: '+385917654321',
    password: 'gospodin',
    confirmPassword: 'gospodin',
    isTutor: true,
  },
];
