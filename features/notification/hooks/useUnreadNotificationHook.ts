import useSWR from 'swr';
import { Notification } from '../types/Notification';
import { fetcher } from '@/lib/Fetcher';

export const useUnreadNotificationHook = () => {
  const { data, error, isLoading } = useSWR<{ data: Notification[] }>(
    '/api/v1/notification/read',
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    notifications: data?.data ?? [],
    isLoading,
    error,
  };
};
