import { Attendance } from './Attendance';
import { Instructor } from './Instructor';
export type Course = {
  course_id: number;
  title: string;
  image: string;
  instructor: Instructor;
  attendance: Attendance;
};
