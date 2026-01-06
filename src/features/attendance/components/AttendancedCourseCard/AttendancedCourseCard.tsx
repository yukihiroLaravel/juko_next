import { AttendancedCourseCardUI } from './AttendancedCourseCard.ui';

export function AttendancedCourseCard() {
  return (
    <AttendancedCourseCardUI
      title="コースタイトル"
      isExpired
      instructorName="講師名"
      progress={77}
    />
  );
}
