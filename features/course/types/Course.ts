export type Course = {
  course_id: number;
  title: string;
  image: string;
  status: CourseStatus;
};

export const COURSE_STATUS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
} as const;

export type CourseStatus = (typeof COURSE_STATUS)[keyof typeof COURSE_STATUS];
