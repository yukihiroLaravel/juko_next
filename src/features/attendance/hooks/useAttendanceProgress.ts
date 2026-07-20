import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { attendanceProgressKey } from '../utils/swrKeys';
import type { AttendanceProgressResponse } from '../types/attendanceProgress';

export function useAttendanceProgress(attendanceId: string) {
  const { data, error, isLoading } = useSWR<AttendanceProgressResponse>(
    attendanceProgressKey(attendanceId),
    fetcher,
  );

  return {
    attendanceProgress: data?.data,
    error,
    isLoading,
  };
}
