'use client';

import { startTransition, useRef, useState } from 'react';
import { NotificationListUI } from './NotificationList.ui';
import { Notification } from '../NotificationTable/NotificationTable.ui';
import { NotificationDetailModal } from '../NotificationDetailModal/NotificationDetailModal';
import { useNotifications } from '../../hooks/useNotifications';
import { format, parseISO } from 'date-fns';

const PAGE_SIZE = 5;

export function NotificationList() {
  type SortBy = 'title' | 'course_id' | 'start_date';

  const [sortBy, setSortBy] = useState<SortBy>('start_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const { notifications: apiNotifications, pagination } = useNotifications({
    page: currentPage,
    perPage: PAGE_SIZE,
    sortBy: sortBy,
    order: sortOrder,
  });

  const notifications: Notification[] = apiNotifications.map((item) => ({
    id: String(item.notification_id),
    title: item.title,
    courseName: item.course_title,
    courseDeadline: null,
    startDate: format(
      parseISO(item.start_date.replace(' ', 'T')),
      'yyyy/MM/dd',
    ),
    body: item.content,
  }));

  const [selectedNotificationId, setSelectedNotificationId] = useState<
    string | null
  >(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const totalPages = Math.ceil((pagination?.total ?? 0) / PAGE_SIZE);
  const lastPage = Math.max(1, totalPages);

  if (pagination && currentPage > lastPage) {
    setCurrentPage(lastPage);
  }

  const selectedNotification =
    notifications.find(
      (notification) => notification.id === selectedNotificationId,
    ) ?? null;

  const handleSortChange = (column: SortBy) => {
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
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onNotificationClick={handleNotificationClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
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
