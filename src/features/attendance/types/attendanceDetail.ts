export type AttendanceDetailTag = {
  tag_id: string;
  name: string;
};

export type AttendanceDetailCourse = {
  course_id: string;
  title: string;
  image: string;
  tags: AttendanceDetailTag[];
};

export type AttendanceDetail = {
  attendance_id: string;
  progress_percent?: number;
  course: AttendanceDetailCourse;
};
