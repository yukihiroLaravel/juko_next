import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { attendanceDetailKey } from '../utils/swrKeys';
import type { AttendanceDetail } from '../types/attendanceDetail';

type AttendanceDetailResponse = {
  data: AttendanceDetail;
};

export function useAttendanceDetail(attendanceId: string) {
  const { data, error, isLoading } = useSWR<AttendanceDetailResponse>(
    attendanceDetailKey(attendanceId),
    fetcher,
  );

  return {
    attendanceDetail: data?.data,
    error,
    isLoading,
  };
}
