import { Student } from './Student';

export type PutStudent = Pick<
  Student,
  | 'studentId'
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
};
