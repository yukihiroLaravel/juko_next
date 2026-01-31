import type { PaginationLinks, PaginationMeta } from '@/types/pagination';

export type Tag = {
  tag_id: string;
  content: string;
};

export type Course = {
  course_id: string;
  title: string;
  image: string;
  tags: Tag[];
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
