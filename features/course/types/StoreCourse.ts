import { Course } from './Course';

export type StoreCourse = Pick<Course, 'title'> & {
  image: File | undefined;
};
