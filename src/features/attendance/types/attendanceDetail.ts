export type LessonAttendance = {
  lesson_attendance_id: number;
  status: 'before_attendance' | 'in_attendance' | 'completed_attendance';
};

export type AttendanceDetailLesson = {
  lesson_id: number;
  url: string;
  title: string;
  remarks: string;
  order: number;
  lessonAttendance: LessonAttendance;
};

export type AttendanceDetailChapter = {
  chapter_id: number;
  title: string;
  order: number;
  lessons: AttendanceDetailLesson[];
};

export type AttendanceDetailTag = {
  tag_id: string;
  content: string;
};

export type AttendanceDetailInstructor = {
  instructor_id: number;
  nick_name: string;
  last_name: string;
  first_name: string;
  email: string;
  profile_image: string;
};

export type AttendanceDetailCourse = {
  course_id: string;
  title: string;
  image: string;
  instructor: AttendanceDetailInstructor;
  tags: AttendanceDetailTag[];
  chapters: AttendanceDetailChapter[];
};

export type AttendanceDetail = {
  attendance_id: string;
  progress_percent?: number;
  deadline_date: string | null;
  expired: boolean;
  course: AttendanceDetailCourse;
};
