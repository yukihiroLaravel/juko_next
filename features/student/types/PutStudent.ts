import { Student } from './Student';

export type PutStudent = Pick<
  Student,
  | 'nick_name'
  | 'last_name'
  | 'first_name'
  | 'email'
  | 'occupation'
  | 'purpose'
  | 'address'
> & {
  gender: string;
  birth_date: Date;
  image: File | null;
};
