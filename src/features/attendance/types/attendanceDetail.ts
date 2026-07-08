import type { LessonStatus } from './lessonStatus';

export type AttendanceDetailTag = {
  tag_id: number;
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

export type AttendanceDetailLessonAttendance = {
  lesson_attendance_id: number;
  status: LessonStatus;
};

export type AttendanceDetailLesson = {
  lesson_id: number;
  url: string;
  title: string;
  remarks: string;
  order: number;
  lessonAttendance: AttendanceDetailLessonAttendance | null;
};

export type AttendanceDetailChapter = {
  chapter_id: number;
  title: string;
  order: number;
  lessons: AttendanceDetailLesson[];
};

export type AttendanceDetailCourse = {
  course_id: number;
  title: string;
  image: string;
  instructor: AttendanceDetailInstructor;
  tags: AttendanceDetailTag[];
  chapters: AttendanceDetailChapter[];
};

export type AttendanceDetail = {
  attendance_id: number;
  deadline_date: string | null;
  expired: boolean;
  course: AttendanceDetailCourse;
};
