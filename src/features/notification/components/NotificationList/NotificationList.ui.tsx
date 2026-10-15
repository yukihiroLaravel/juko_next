'use client';

import { NotificationTable } from '../NotificationTable/NotificationTable';
import {
  Notification,
  NotificationSortColumn,
} from '../NotificationTable/NotificationTable.ui';
import { Button } from '@/components/atoms/Button';
import type { NotificationSortOrder } from '@/features/notification/types/notification';

type Props = {
  notifications: Notification[];
  sortBy: NotificationSortColumn;
  sortOrder: NotificationSortOrder;
  onSortChange: (column: NotificationSortColumn) => void;
  onNotificationClick: (notificationId: string) => void;

  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function NotificationListUI({
  notifications,
  sortBy,
  sortOrder,
  onSortChange,
  onNotificationClick,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="space-y-6">
      {notifications.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center text-sm">
          現在、お知らせはありません。
        </div>
      ) : (
        <NotificationTable
          notifications={notifications}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
          onNotificationClick={onNotificationClick}
        />
      )}

      {/* ページネーション（0件のときは出さない） */}
      {totalPages > 0 && (
        <div className="flex items-center justify-center gap-2">
          {/* 前へ */}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </Button>

          {/* ページ番号 */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;

            return (
              <Button
                key={page}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            );
          })}

          {/* 次へ */}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </Button>
        </div>
      )}
    </div>
  );
}
