import { AttendancedCourseCardUI } from './AttendancedCourseCard.ui';

type AttendancedCourseCardProps = {
  title: string;
  isExpired: boolean;
  instructorName: string;
  progress: number;
};

export function AttendancedCourseCard({
  title,
  isExpired,
  instructorName,
  progress,
}: AttendancedCourseCardProps) {
  return (
    <AttendancedCourseCardUI
      title={title}
      isExpired={isExpired}
      instructorName={instructorName}
      progress={progress}
    />
  );
}

