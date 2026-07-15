import Link from 'next/link';

import { Button } from '@/components/atoms/Button';
import type { LessonStatus } from '@/features/attendance/types/lessonStatus';

export type LessonBreadcrumbItem = {
  label: string;
  href?: string;
};

export type LessonIndexItem = {
  label: string;
  time: string;
};

const STATUS_BUTTONS: { status: LessonStatus; label: string }[] = [
  { status: 'before_attendance', label: 'Lesson未実施' },
  { status: 'in_attendance', label: 'Lesson開始' },
  { status: 'completed_attendance', label: 'Lesson完了' },
];

type LessonUIProps = {
  breadcrumbs: LessonBreadcrumbItem[];
  chapterTitle: string;
  lessonTitle: string;
  videoUrl?: string;
  index: LessonIndexItem[];
  status: LessonStatus;
  onStatusChange: (status: LessonStatus) => void;
  canUpdate?: boolean;
  isSubmitting?: boolean;
  errorMessage?: string | null;
};

export function LessonUI({
  breadcrumbs,
  chapterTitle,
  lessonTitle,
  videoUrl,
  index,
  status,
  onStatusChange,
  canUpdate = true,
  isSubmitting = false,
  errorMessage = null,
}: LessonUIProps) {
  return (
    <div className="space-y-4">
      {/* パンくず */}
      <nav
        aria-label="パンくずリスト"
        className="text-muted-foreground text-xs"
      >
        <ol className="flex flex-wrap items-center gap-1">
          {breadcrumbs.map((item, breadcrumbIndex) => {
            const isLast = breadcrumbIndex === breadcrumbs.length - 1;

            return (
              <li key={item.label} className="flex items-center gap-1">
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{item.label}</span>
                )}

                {!isLast && <span>&gt;</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* チャプタータイトル */}
      <div className="space-y-4">
        <h1 className="text-lg font-semibold">{chapterTitle}</h1>
        <hr className="border-border" />
      </div>

      {/* レッスンタイトル */}
      <h2 className="text-xl font-bold">{lessonTitle}</h2>

      {/* 動画プレイヤー */}
      {videoUrl ? (
        <video
          controls
          src={videoUrl}
          className="aspect-video w-full rounded bg-black"
        />
      ) : (
        <div className="bg-muted flex aspect-video w-full items-center justify-center rounded">
          <span>レッスン動画</span>
        </div>
      )}

      {/* ステータス操作ボタン */}
      <div className="flex flex-wrap gap-3">
        {STATUS_BUTTONS.map((button) => {
          const isActive = button.status === status;

          return (
            <Button
              key={button.status}
              type="button"
              variant={isActive ? 'default' : 'outline'}
              aria-pressed={isActive}
              disabled={!canUpdate || isSubmitting}
              onClick={() => onStatusChange(button.status)}
            >
              {button.label}
            </Button>
          );
        })}
      </div>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      {/* インデックス（目次） */}
      <div className="space-y-1 text-sm">
        <p className="font-semibold">Index</p>
        <ul>
          {index.map((item) => (
            <li key={item.label} className="flex gap-4">
              <span>・{item.label}</span>
              <span>{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
