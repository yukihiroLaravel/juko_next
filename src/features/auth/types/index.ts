export type UserRole = 'student' | 'instructor';

export type User = {
  id: number;
  nick_name: string;
  email: string;
  role: UserRole;
};
