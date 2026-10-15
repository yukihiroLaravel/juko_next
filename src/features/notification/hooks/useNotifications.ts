import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import type {
  NotificationsQuery,
  NotificationsResponse,
} from '../types/notification';

export function useNotifications({
  page,
  perPage,
  sortBy,
  order,
}: NotificationsQuery) {
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
