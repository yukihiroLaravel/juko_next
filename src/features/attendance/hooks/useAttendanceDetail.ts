import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import type { AttendanceDetail } from '../types/attendanceDetail';

type AttendanceDetailResponse = {
  data: AttendanceDetail;
};

export function useAttendanceDetail(attendanceId: string) {
  const { data, error, isLoading } = useSWR<AttendanceDetailResponse>(
    attendanceId ? `/api/v1/attendance/${attendanceId}` : null,
    fetcher,
  );

  return {
    attendanceDetail: data?.data,
    error,
    isLoading,
  };
}
