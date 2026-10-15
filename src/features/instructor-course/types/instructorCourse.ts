export type InstructorCourseApiDeadline = {
  fixed_date?: string | null;
  relative_days?: number | null;
};

export type InstructorCourseApiItem = {
  course_id: number;
  title: string;
  image: string | null;
  status: string;
  has_active_students: boolean;
  tags: Array<{ tag_id: number; content: string }>;
  course_deadline: InstructorCourseApiDeadline | null;
};

export type InstructorCoursesMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type InstructorCoursesLinks = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};

export type InstructorCoursesResponse = {
  data: InstructorCourseApiItem[];
  meta: InstructorCoursesMeta;
  links: InstructorCoursesLinks;
};
