import { Skeleton } from '@/components/atoms/Skeleton';

export function NotificationListSkeleton() {
  return (
    <div data-testid="notification-list-skeleton" className="mt-4 space-y-4">
      {/* テーブルの見出し */}
      <div className="flex gap-4 border-b pb-3">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/4" />
      </div>

      {/* お知らせ5件分 */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 border-b py-3">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/4" />
        </div>
      ))}
    </div>
  );
}
