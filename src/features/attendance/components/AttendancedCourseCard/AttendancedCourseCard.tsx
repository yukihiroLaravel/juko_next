import { AttendancedCourseCardUI } from './AttendancedCourseCard.ui';

type AttendancedCourseCardProps = {
  title: string;
  instructorName: string;
  isExpired: boolean;
  progress: number;
};

export function AttendancedCourseCard({
  title,
  instructorName,
  isExpired,
  progress,
}: AttendancedCourseCardProps) {
  return (
    <AttendancedCourseCardUI
      title={title}
      instructorName={instructorName}
      isExpired={isExpired}
      progress={progress}
    />
  );
}
