import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import type { AttendancesResponse } from '../types/attendance';

export function useAttendances() {
  const { data, error } = useSWR<AttendancesResponse>(
    "/api/v1/attendance/index",
    fetcher,
    { suspense: true },
  );

  return {
    attendances: data?.data ?? [],
    meta: data?.meta,
    links: data?.links,
    error,
  };
}
