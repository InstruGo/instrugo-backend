import { EducationLevel } from '../../lessons/entities/lesson.education-level.enum';
import { User } from '../entities/user.entity';

export class StudentPublicProfileDto {
  id: number;
  firstName: string;
  lastName: string;
  description?: string;
  educationLevel?: EducationLevel;
  grade?: number;
  avatarUrl: string;

  static fromUserEntity(user: User) {
    const profile = new StudentPublicProfileDto();
    profile.id = user.id;
    profile.firstName = user.firstName;
    profile.lastName = user.lastName;
    profile.description = user.description;
    profile.educationLevel = user.educationLevel;
    profile.grade = user.grade;
    profile.avatarUrl = user.avatarUrl;

    return profile;
  }
}
