import { Instructor } from './Instructor';

export type PutInstructor = Pick<
  Instructor,
  'nick_name' | 'last_name' | 'first_name' | 'email'
> & {
  image: File | null;
};
