'use client';

import { AttendancedCourseCardListUI } from './AttendancedCourseCardList.ui';

export function AttendancedCourseCardList() {
  const courses = [
    {
      id: '1',
      title: 'コースタイトル',
      instructorName: '講師名',
      progress: 77,
      isExpired: false,
    },
    {
      id: '2',
      title: 'コースタイトル',
      instructorName: '講師名',
      progress: 77,
      isExpired: true, // ← 期限切れ
    },
    {
      id: '3',
      title: 'コースタイトル',
      instructorName: '講師名',
      progress: 77,
      isExpired: false,
    },
    {
      id: '4',
      title: 'コースタイトル',
      instructorName: '講師名',
      progress: 77,
      isExpired: false,
    },
  ];

  return <AttendancedCourseCardListUI courses={courses} />;
}
