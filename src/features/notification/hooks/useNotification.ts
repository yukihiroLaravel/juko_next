import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '@/utils/fetcher';
import { notificationKey } from '../utils/swrKeys';
import type { NotificationResponse } from '../types/notification';

export function useNotification(notificationId: number | null) {
  const { data } = useSWR<NotificationResponse>(
    notificationKey(notificationId),
    fetcher,
    { suspense: true, shouldRetryOnError: false },
  );
  return { notification: data?.data };
}

export function useRetryNotification() {
  const { mutate, cache } = useSWRConfig();

  function clearNotificationError(notificationId: number) {
    const key = notificationKey(notificationId);
    if (key === null) return;
    const cached = cache.get(key);
    // 再検証の失敗で正常データも残っている場合は、そのデータを保持する。
    if (cached?.error && cached.data === undefined) cache.delete(key);
  }

  async function retryNotification(notificationId: number) {
    const key = notificationKey(notificationId);
    if (key === null) return { success: false };
    try {
      // 初回取得の失敗では取得部品が未マウントのため、明示的に取得してキャッシュを更新する。
      await mutate(key, fetcher<NotificationResponse>(key), {
        revalidate: false,
      });
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  return { retryNotification, clearNotificationError };
}
