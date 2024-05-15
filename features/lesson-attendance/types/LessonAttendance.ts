export type LessonAttendance = {
  lesson_attendance_id: number;
  status: LessonAttendanceStatus;
};

export const LESSON_ATTENDANCE_STATUS = {
  STATUS_BEFORE_ATTENDANCE: 'before_attendance',
  STATUS_IN_ATTENDANCE: 'in_attendance',
  STATUS_COMPLETED_ATTENDANCE: 'completed_attendance',
} as const;

export type LessonAttendanceStatus =
  | typeof LESSON_ATTENDANCE_STATUS.STATUS_BEFORE_ATTENDANCE
  | typeof LESSON_ATTENDANCE_STATUS.STATUS_IN_ATTENDANCE
  | typeof LESSON_ATTENDANCE_STATUS.STATUS_COMPLETED_ATTENDANCE;
