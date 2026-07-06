import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import type { AttendanceDetailsResponse } from '../types/lesson';

export function useLesson(attendanceId: string) {
  const { data, error, mutate } = useSWR<AttendanceDetailsResponse>(
    attendanceId ? `/api/v1/attendances/${attendanceId}` : null,
    fetcher,
    { suspense: true },
  );

  return {
    attendanceDetail: data?.data,
    error,
    mutate,
  };
}
