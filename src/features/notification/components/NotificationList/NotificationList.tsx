'use client';

import { useMemo, useState } from 'react';
import { NotificationListUI } from './NotificationList.ui';
import { Notification } from '../NotificationTable/NotificationTable.ui';
import { NotificationDetailModal } from '../NotificationDetailModal/NotificationDetailModal';

const PAGE_SIZE = 5;

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '領収書について',
    courseName: 'PHPコース',
    courseDeadline: null,
    startDate: '2023/9/25',
    body: `領収書の発行についてお知らせします。

領収書をご希望の場合は、受講生ページより申請してください。
申請内容を確認後、順次発行いたします。`,
  },
  {
    id: '2',
    title: 'レッスンについて',
    courseName: 'Javaコース',
    courseDeadline: '2024/12/31',
    startDate: '2024/1/1',
    body: `レッスンについてのお知らせです。

受講前に教材をご確認ください。
ご不明な点がありましたら、担当講師までお問い合わせください。`,
  },
  {
    id: '3',
    title: '課題提出について',
    courseName: 'Reactコース',
    courseDeadline: '2024/6/30',
    startDate: '2024/2/15',
    body: `課題提出についてのお知らせです。

提出期限までに課題を提出してください。
提出後は担当講師からのフィードバックをご確認ください。`,
  },
  {
    id: '4',
    title: 'メンテナンスのお知らせ',
    courseName: '共通',
    courseDeadline: null,
    startDate: '2024/3/10',
    body: `システムメンテナンスを実施します。

メンテナンス中は一部の機能をご利用いただけない場合があります。
ご理解のほどよろしくお願いいたします。`,
  },
  {
    id: '5',
    title: '修了証発行について',
    courseName: 'PHPコース',
    courseDeadline: null,
    startDate: '2024/3/20',
    body: `修了証の発行についてお知らせします。

すべてのレッスンを修了した方は、修了証を申請できます。
詳細は受講生ページをご確認ください。`,
  },
  {
    id: '6',
    title: '追加教材のお知らせ',
    courseName: 'Javaコース',
    courseDeadline: null,
    startDate: '2024/4/1',
    body: `新しい教材を追加しました。

受講中の講座ページからご確認いただけます。
ぜひ今後の学習にご活用ください。`,
  },
];

export function NotificationList() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotificationId, setSelectedNotificationId] = useState<
    string | null
  >(null);

  const sortedNotifications = useMemo(() => {
    return [...mockNotifications].sort((a, b) => {
      const aDate = new Date(a.startDate).getTime();
      const bDate = new Date(b.startDate).getTime();
      return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
    });
  }, [sortOrder]);

  const totalPages = Math.ceil(sortedNotifications.length / PAGE_SIZE);

  const paginatedNotifications = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return sortedNotifications.slice(start, end);
  }, [sortedNotifications, currentPage]);
  const selectedNotification =
    mockNotifications.find(
      (notification) => notification.id === selectedNotificationId,
    ) ?? null;

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1);
  };

  const handleNotificationClick = (notificationId: string) => {
    setSelectedNotificationId(notificationId);
    console.log('既読登録:', notificationId);
  };

  const handleModalClose = () => {
    setSelectedNotificationId(null);
  };

  return (
    <>
      <NotificationListUI
        notifications={paginatedNotifications}
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
      />
    </>
  );
}
