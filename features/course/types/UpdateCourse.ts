import { Course } from './Course';

export type UpdateCourse = Pick<Course, 'course_id' | 'title' | 'status'> & {
  image: File | undefined;
};
