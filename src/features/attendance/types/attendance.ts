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
  expired: string;
  course: Course;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type AttendancesResponse = {
  data: Attendance[];
  links: PaginationLinks;
  meta: PaginationMeta;
};