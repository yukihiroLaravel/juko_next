export type UserRole = 'student' | 'instructor';

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};
