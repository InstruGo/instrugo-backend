import { RegistrationCredentialsDto } from '../../auth/dto/registration-credentials.dto';

export const admins: RegistrationCredentialsDto[] = [
  {
    email: 'admin@instrugo.com',
    firstName: 'Pero',
    lastName: 'Adminić',
    phone: '+385992667419',
    password: 'admin',
    confirmPassword: 'admin',
    isTutor: true,
  },
];

export const students: RegistrationCredentialsDto[] = [
  {
    email: 'ivan.skorupan@fer.hr',
    firstName: 'Ivan',
    lastName: 'Skorupan',
    phone: '+385992667419',
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
];

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
];
