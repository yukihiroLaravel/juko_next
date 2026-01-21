import Link from 'next/link';
import Image from 'next/image';

type CourseSidebarUIProps = {
  thumbnailUrl: string;
  categoryName: string;
  courseName: string;
  progressPercent: number;
};

export function CourseSidebarUI({
  thumbnailUrl,
  categoryName,
  courseName,
  progressPercent,
}: CourseSidebarUIProps) {
  return (
    <aside className="w-64 space-y-4 border-r p-4">
      {/* サムネイル */}
      <div>
        <Image
          src={thumbnailUrl}
          alt={courseName}
          width={256}
          height={144}
          className="w-full rounded"
        />
      </div>

      {/* 講座情報 */}
      <div>
        <p className="text-sm text-gray-500">{categoryName}</p>
        <h2 className="text-base font-semibold">{courseName}</h2>
      </div>

      {/* 進捗 */}
      <div>
        <p className="text-sm">
          進捗率：<span className="font-bold">{progressPercent}%</span>
        </p>
      </div>

      {/* ナビゲーション */}
      <nav className="space-y-2">
        <Link href="#" className="block text-sm text-blue-600 hover:underline">
          受講生一覧
        </Link>
        <Link
          href="/notifications"
          className="block text-sm text-blue-600 hover:underline"
        >
          お知らせ一覧
        </Link>
      </nav>
    </aside>
  );
}
