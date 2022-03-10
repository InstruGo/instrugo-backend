import { UserRole } from './entities/user.role.enum';

export interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}
