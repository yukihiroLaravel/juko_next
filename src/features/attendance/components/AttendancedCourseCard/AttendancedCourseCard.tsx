import { AttendancedCourseCardUI } from './AttendancedCourseCard.ui';

type AttendancedCourseCardProps = {
  attendanceId: number | string;
  title: string;
  instructorName: string;
  isExpired: boolean;
  progress: number;
};

export function AttendancedCourseCard({
  attendanceId,
  title,
  instructorName,
  isExpired,
  progress,
}: AttendancedCourseCardProps) {
  const href = `/attendance/${attendanceId}`;

  return (
    <AttendancedCourseCardUI
      href={href}
      title={title}
      instructorName={instructorName}
      isExpired={isExpired}
      progress={progress}
    />
  );
}
