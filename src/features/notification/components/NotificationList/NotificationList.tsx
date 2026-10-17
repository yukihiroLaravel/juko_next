'use client';

import { startTransition, useRef, useState } from 'react';
import { NotificationListUI } from './NotificationList.ui';
import type { NotificationSortColumn } from '../NotificationTable/NotificationTable.ui';
import { NotificationDetailModal } from '../NotificationDetailModal/NotificationDetailModal';
import { useMarkNotificationRead } from '../../hooks/useMarkNotificationRead';
import { useNotifications } from '../../hooks/useNotifications';
import { mapNotificationItemToNotification } from '../../utils/mapNotificationItemToNotification';
import type { NotificationSortOrder } from '../../types/notification';

const PAGE_SIZE = 5;

export function NotificationList() {
  const [sortBy, setSortBy] = useState<NotificationSortColumn>('start_date');
  const [sortOrder, setSortOrder] = useState<NotificationSortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const { notifications: apiNotifications, pagination } = useNotifications({
    page: currentPage,
    perPage: PAGE_SIZE,
    sortBy: sortBy,
    order: sortOrder,
  });

  const notifications = apiNotifications.map(mapNotificationItemToNotification);

  const [selectedNotificationId, setSelectedNotificationId] = useState<
    number | null
  >(null);
  const { markNotificationRead } = useMarkNotificationRead();
  const attemptedReadIds = useRef(new Set<number>());
  const openerRef = useRef<HTMLElement | null>(null);

  const totalPages = Math.ceil((pagination?.total ?? 0) / PAGE_SIZE);
  const lastPage = Math.max(1, totalPages);

  if (pagination && currentPage > lastPage) {
    setCurrentPage(lastPage);
  }

  const handleSortChange = (column: NotificationSortColumn) => {
    startTransition(() => {
      if (sortBy === column) {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(column);
        setSortOrder('asc');
      }

      setCurrentPage(1);
    });
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      setCurrentPage(page);
    });
  };

  const handleNotificationClick = (notificationId: string) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    const id = Number(notificationId);
    setSelectedNotificationId(id);
    const item = apiNotifications.find(
      (notification) => notification.notification_id === id,
    );
    if (item?.type !== 'once' || attemptedReadIds.current.has(id)) return;
    // 送信前に記録し、送信中・失敗後も同じ画面では再送しない。
    attemptedReadIds.current.add(id);
    void markNotificationRead(id).then((result) => {
      if (!result.success)
        console.warn('既読登録に失敗しました', {
          notificationId: id,
          reason: result.error,
        });
    });
  };

  const handleModalClose = () => {
    setSelectedNotificationId(null);
  };

  return (
    <>
      <NotificationListUI
        notifications={notifications}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onNotificationClick={handleNotificationClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <NotificationDetailModal
        notificationId={selectedNotificationId}
        onClose={handleModalClose}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          openerRef.current?.focus();
        }}
      />
    </>
  );
}
