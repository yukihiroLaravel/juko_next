import type { LessonStatus } from './lessonStatus';

export type AttendanceDetailInstructor = {
  instructor_id: number;
  nick_name: string;
  last_name: string;
  first_name: string;
  email: string;
  profile_image: string;
};

export type LessonAttendance = {
  lesson_attendance_id: number;
  status: LessonStatus;
};

export type AttendanceDetailLesson = {
  lesson_id: number;
  title: string;
  url: string;
  remarks: string;
  lesson_attendance: LessonAttendance | null;
};

export type AttendanceDetailChapter = {
  chapter_id: number;
  title: string;
  lessons: AttendanceDetailLesson[];
};

export type AttendanceDetailCourse = {
  course_id: number;
  title: string;
  image: string;
  instructor: AttendanceDetailInstructor;
  chapters: AttendanceDetailChapter[];
};

export type AttendanceDetailData = {
  attendance_id: number;
  progress: number;
  course: AttendanceDetailCourse;
};

export type AttendanceDetailsResponse = {
  data: AttendanceDetailData;
};
