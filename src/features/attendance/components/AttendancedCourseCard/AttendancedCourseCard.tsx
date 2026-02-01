import { AttendancedCourseCardUI } from './AttendancedCourseCard.ui';

type AttendancedCourseCardProps = {
  title: string;
  isExpired: boolean;
  progress: number;
};

export function AttendancedCourseCard({
  title,
  isExpired,
  progress,
}: AttendancedCourseCardProps) {
  return (
    <AttendancedCourseCardUI
      title={title}
      isExpired={isExpired}
      progress={progress}
    />
  );
}
