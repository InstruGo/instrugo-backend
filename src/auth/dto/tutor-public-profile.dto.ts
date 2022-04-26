import { Subject } from '../../lessons/entities/subject.entity';
import { User } from '../entities/user.entity';

export class TutorPublicProfileDto {
  id: number;
  firstName: string;
  lastName: string;
  birthDate?: string;
  description?: string;
  avatarUrl: string;
  averageRating: number;
  subjects: Subject[];

  static fromUserEntity(user: User) {
    const profile = new TutorPublicProfileDto();
    profile.id = user.id;
    profile.firstName = user.firstName;
    profile.lastName = user.lastName;
    profile.birthDate = user.birthDate.toISOString();
    profile.description = user.description;
    profile.avatarUrl = user.avatarUrl;
    profile.averageRating = user.averageRating;
    profile.subjects = user.subjects;

    return profile;
  }
}
