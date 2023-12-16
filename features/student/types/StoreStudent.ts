import { Student } from './Student';

export type StoreStudent = Pick<
  Student,
  | 'nickName'
  | 'lastName'
  | 'firstName'
  | 'email'
  | 'occupation'
  | 'purpose'
  | 'birthDate'
  | 'address'
> & {
  sex: string;
};
