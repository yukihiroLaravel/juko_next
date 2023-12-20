import { Student } from './Student';

export type PutStudent = Pick<
  Student,
  | 'nickName'
  | 'lastName'
  | 'firstName'
  | 'email'
  | 'occupation'
  | 'purpose'
  | 'address'
> & {
  sex: string;
  birthDate: Date;
  image: File | null;
};
