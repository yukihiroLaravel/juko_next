export type LessonAttendance = {
  lesson_attendance_id: number;
  status: 'before_attendance' | 'in_attendance' | 'completed_attendance';
};

export type LessonAttendanceStatus = {
  [lessonId: number]: 'before_attendance' | 'in_attendance' | 'completed_attendance';
};