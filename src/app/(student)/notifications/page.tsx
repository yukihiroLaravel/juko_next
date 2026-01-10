import { NotificationList } from "@/features/notification/components/NotificationList/NotificationList";

export default function NotificationsPage() {
  return (
    <div className="px-6 py-4">
      {/* ページ内ヘッダー（attendance と同じ構造） */}
      <div className="mx-auto space-y-4">
        <h1 className="text-lg font-semibold">お知らせ一覧</h1>

        {/* グレーの区切り線 */}
        <div className="h-px w-full bg-border" />
      </div>

      {/* お知らせ一覧 */}
      <NotificationList />
    </div>
  );
}

