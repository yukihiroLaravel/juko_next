import { Student } from './Student';

export type StoreStudent = Pick<
  Student,
  | 'nick_name'
  | 'last_name'
  | 'first_name'
  | 'email'
  | 'occupation'
  | 'purpose'
  | 'birth_date'
  | 'address'
> & {
  sex: string;
};
