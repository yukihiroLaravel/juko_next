export type Attendance = {
  attendance_id: number;
  course: Course;
};

export type Course = {
  course_id: number;
  title: string;
  image: string;
};

export type ContinueFrom = {
  chapter_id: number;
  chapter_title: string;
  lesson_id: number;
  lesson_title: string;
};

export type AttendanceProgress = {
  attendance: Attendance;
  number_of_completed_chapters: number;
  number_of_total_chapters: number;
  number_of_completed_lessons: number;
  number_of_total_lessons: number;
  continue_from: ContinueFrom;
};

export type AttendanceProgressResponse = {
  data: AttendanceProgress;
};
