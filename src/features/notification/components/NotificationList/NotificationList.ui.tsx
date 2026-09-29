'use client';

import { NotificationTable } from '../NotificationTable/NotificationTable';
import { Notification } from '../NotificationTable/NotificationTable.ui';
import { Button } from '@/components/atoms/Button';

type Props = {
  notifications: Notification[];
  sortOrder: 'asc' | 'desc';
  onSortChange: () => void;

  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function NotificationListUI({
  notifications,
  sortOrder,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="space-y-6">
      <NotificationTable
        notifications={notifications}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />

      {/* ページネーション */}
      <div className="flex items-center justify-center gap-2">
        {/* 前へ */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
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
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
