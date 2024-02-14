import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';

interface Props {
  courseId: number | undefined;
}

export const useFetchAttendanceStatus = ({ courseId }: Props) => {
  const {
    data: attendanceStatus,
    isLoading,
    error,
  } = useSWR<{
    data: {
      chapters: {
        chapter_id: number;
        title: string;
        completed_count: number;
      }[];
      students_count: number;
    };
  }>(
    courseId ? `/api/v1/instructor/course/${courseId}/attendance/status` : null,
    fetcher
  );

  return {
    attendanceStatus: attendanceStatus?.data,
    isLoading,
    error,
  };
};
