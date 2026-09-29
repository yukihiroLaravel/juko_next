import type { PaginationLinks, PaginationMeta } from '@/types/pagination';

export type Tag = {
  tag_id: string;
  content: string;
};

export type Instructor = {
  instructor_id: string;
  first_name: string;
  last_name: string;
  nick_name: string;
  email: string;
  profile_image: string;
};

export type Course = {
  course_id: string;
  title: string;
  image: string;
  tags: Tag[];
  instructor: Instructor;
};

export type Attendance = {
  attendance_id: string;
  deadline_date: string;
  expired: boolean;
  course: Course;
};

export type AttendancesResponse = {
  data: Attendance[];
  links: PaginationLinks;
  meta: PaginationMeta;
};
