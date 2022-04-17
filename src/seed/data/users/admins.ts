import { RegistrationCredentialsDto } from '../../../auth/dto/registration-credentials.dto';

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
  {
    email: 'adminka@instrugo.com',
    firstName: 'Monika',
    lastName: 'Belluci',
    phone: '+38598826321',
    password: 'admin',
    confirmPassword: 'admin',
    isTutor: true,
  },
];
