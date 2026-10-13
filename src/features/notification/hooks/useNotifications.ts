import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import type { NotificationsResponse } from '../types/notification';

type UseNotificationsParams = {
  page: number;
  perPage: number;
  sortBy: 'title' | 'course_id' | 'start_date' | 'instructor_nick_name' | 'read_status';
  order: 'asc' | 'desc';
};

export function useNotifications({
  page,
  perPage,
  sortBy,
  order,
}: UseNotificationsParams) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    sort_by: sortBy,
    order,
  });

  const { data, error } = useSWR<NotificationsResponse>(
    `/api/v1/notifications/index?${params.toString()}`,
    fetcher,
    { suspense: true },
  );

  return {
    notifications: data?.data.notifications ?? [],
    pagination: data?.data.pagination,
    error,
  };
}