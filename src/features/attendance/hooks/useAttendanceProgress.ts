import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import type { AttendanceProgressResponse } from '../types/attendanceProgress';

export function useAttendanceProgress(attendanceId: string) {
  const { data, error, isLoading } = useSWR<AttendanceProgressResponse>(
    attendanceId ? `/api/v1/attendances/${attendanceId}/progress` : null,
    fetcher,
  );

  return {
    attendanceProgress: data?.data,
    error,
    isLoading,
  };
}
