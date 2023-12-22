import { Instructor } from './Instructor';

export type PutInstructor = Pick<
  Instructor,
  'nickName' | 'lastName' | 'firstName' | 'email'
> & {
  image: File | null;
};
