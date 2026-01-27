import useSWR from "swr";
import type { AttendancesResponse } from "../types/attendance";

const fetcher = async (url: string): Promise<AttendancesResponse> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<AttendancesResponse>;
};

export function useAttendances() {
  const { data, error, isLoading } = useSWR<AttendancesResponse>(
    "/api/v1/attendance/index",
    fetcher,
    { suspense: true }
  );

  return {
    attendances: data?.data ?? [],
    meta: data?.meta,
    links: data?.links,
    error,
    isLoading,
  };
}
