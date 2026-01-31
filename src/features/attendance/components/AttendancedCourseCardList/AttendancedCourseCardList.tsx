'use client';

import { useAttendances } from '../../hooks/useAttendances';
import { AttendancedCourseCardListUI } from './AttendancedCourseCardList.ui';

export function AttendancedCourseCardList() {
  const { attendances } = useAttendances();

  const courses = attendances.map((attendance) => ({
    id: attendance.attendance_id,
    title: attendance.course.title,
    instructorName: '講師名',
    progress: 77,
    isExpired: attendance.expired === '1',
  }));

  return <AttendancedCourseCardListUI courses={courses} />;
}
