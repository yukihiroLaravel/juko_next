import Link from 'next/link';
import { AttendancedCourseCardUI } from './AttendancedCourseCard.ui';

type AttendancedCourseCardProps = {
  attendanceId: string;
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
    <Link href={href} className="block w-full max-w-[350px]">
      <AttendancedCourseCardUI
        href={href}
        title={title}
        instructorName={instructorName}
        isExpired={isExpired}
        progress={progress}
      />
    </Link>
  );
}
