'use client';

import { useRef, useState } from 'react';
import { NotificationListUI } from './NotificationList.ui';
import { Notification } from '../NotificationTable/NotificationTable.ui';
import { NotificationDetailModal } from '../NotificationDetailModal/NotificationDetailModal';
import { useNotifications } from '../../hooks/useNotifications';

const PAGE_SIZE = 5;

export function NotificationList() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const { notifications: apiNotifications, pagination } = useNotifications({
    page: currentPage,
    perPage: PAGE_SIZE,
    sortBy: 'start_date',
    order: sortOrder,
  });

  const notifications: Notification[] = apiNotifications.map((item) => ({
    id: String(item.notification_id),
    title: item.title,
    courseName: item.course_title,
    courseDeadline: null,
    startDate: item.start_date,
    body: item.content,
  }));

  const [selectedNotificationId, setSelectedNotificationId] = useState<
    string | null
  >(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const totalPages = Math.ceil((pagination?.total ?? 0) / PAGE_SIZE);

  const selectedNotification =
    notifications.find(
      (notification) => notification.id === selectedNotificationId,
    ) ?? null;

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1);
  };

  const handleNotificationClick = (notificationId: string) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setSelectedNotificationId(notificationId);
    console.log('既読登録:', notificationId);
  };

  const handleModalClose = () => {
    setSelectedNotificationId(null);
  };

  return (
    <>
      <NotificationListUI
        notifications={notifications}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onNotificationClick={handleNotificationClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <NotificationDetailModal
        notification={selectedNotification}
        onClose={handleModalClose}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          openerRef.current?.focus();
        }}
      />
    </>
  );
}
