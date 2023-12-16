import { Student } from './Student';

export type PutStudent = Pick<
  Student,
  | 'studentId'
  | 'nickName'
  | 'lastName'
  | 'firstName'
  | 'email'
  | 'birthDate'
  | 'occupation'
  | 'purpose'
  | 'address'
> & {
  sex: string;
};
