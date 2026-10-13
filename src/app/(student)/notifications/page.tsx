'use clinet';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { NotificationList } from '@/features/notification/components/NotificationList/NotificationList';
import { NotificationListSkeleton } from '@/features/notification/components/NotificationList/NotificationList.skeleton';

export default function NotificationsPage() {
  return (
    <div className="px-6 py-4">
      {/* ページ内ヘッダー（attendance と同じ構造） */}
      <div className="mx-auto space-y-4">
        <h1 className="text-lg font-semibold">お知らせ一覧</h1>

        {/* グレーの区切り線 */}
        <hr className="border-border" />
      </div>

      {/* お知らせ一覧 */}
      <ErrorBoundary fallback={<div>エラーが発生しました</div>}>
        <Suspense fallback={<NotificationListSkeleton />}>
          <NotificationList />
        </Suspense>
      </ErrorBoundary>  
    </div>
  );
}
