'use client';

import { useAttendances } from '../../hooks/useAttendances';
import { AttendancedCourseCardListUI } from './AttendancedCourseCardList.ui';

export function AttendancedCourseCardList() {
  const { attendances } = useAttendances();

  const courses = attendances.map((attendance) => ({
    attendanceId: attendance.attendance_id,
    title: attendance.course.title,
    instructorName: `${attendance.course.instructor.last_name} ${attendance.course.instructor.first_name}`,
    progress: 77,
    isExpired: attendance.expired,
  }));

  return <AttendancedCourseCardListUI courses={courses} />;
}
