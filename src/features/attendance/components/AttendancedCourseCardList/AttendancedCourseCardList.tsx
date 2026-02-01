'use client';

import { useAttendances } from '../../hooks/useAttendances';
import { AttendancedCourseCardListUI } from './AttendancedCourseCardList.ui';

export function AttendancedCourseCardList() {
  const { attendances } = useAttendances();

  const courses = attendances.map((attendance) => ({
    id: attendance.attendance_id,
    title: attendance.course.title,
    progress: 77,
    isExpired: attendance.expired,
  }));

  return <AttendancedCourseCardListUI courses={courses} />;
}
