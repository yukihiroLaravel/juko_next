import type { NotificationsQuery } from '@/features/notification/types/notification';

export function notificationKey(notificationId: number) {
  return `/api/v1/notifications/${notificationId}`;
}

export function isNotificationsKey(key: unknown): key is string {
  return (
    typeof key === 'string' && key.startsWith('/api/v1/notifications/index?')
  );
}

/**
 * お知らせ関連APIのSWRキー。
 * 一覧の取得と、既読登録のあとの再検証で同じキーを使う。
 */
export function notificationsKey({
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

  return `/api/v1/notifications/index?${params.toString()}`;
}
