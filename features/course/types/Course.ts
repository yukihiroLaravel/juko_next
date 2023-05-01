import { Attendance } from '@/types/Attendance';
import { Instructor } from '@/types/Instructor';

export type Course = {
  course_id: number;
  title: string;
  image: string;
  instructor: Instructor;
  attendance: Attendance;
};
