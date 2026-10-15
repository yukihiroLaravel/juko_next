import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { notificationsKey } from '../utils/swrKeys';
import type {
  NotificationsQuery,
  NotificationsResponse,
} from '../types/notification';

export function useNotifications(query: NotificationsQuery) {
  const { data } = useSWR<NotificationsResponse>(
    notificationsKey(query),
    fetcher,
    { suspense: true },
  );

  return {
    notifications: data?.data.notifications ?? [],
    pagination: data?.data.pagination,
  };
}
