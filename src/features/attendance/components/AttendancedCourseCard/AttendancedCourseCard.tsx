import Link from 'next/link';
import { routes } from '@/lib/routes';
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
  const href = routes.attendance.detail(attendanceId);

  return (
    <Link href={href} className="block w-full max-w-[350px]">
      <AttendancedCourseCardUI
        title={title}
        instructorName={instructorName}
        isExpired={isExpired}
        progress={progress}
      />
    </Link>
  );
}
