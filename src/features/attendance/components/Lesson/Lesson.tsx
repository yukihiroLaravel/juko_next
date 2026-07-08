'use client';

import { useState } from 'react';

import { LessonStatus } from '@/features/attendance/types/lessonStatus';
import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { mapAttendanceDetailToLesson } from '@/features/attendance/utils/mapAttendanceDetailToLesson';
import { LessonUI, LessonBreadcrumbItem, LessonIndexItem } from './Lesson.ui';

// パンくずリスト（URLは未実装）
const breadcrumbs: LessonBreadcrumbItem[] = [
  { label: '講座分類', href: '#' },
  { label: '講座一覧', href: '#' },
  { label: 'チャプター&レッスン一覧', href: '#' },
  { label: 'レッスン' },
];

// 目次（値はダミー）
const index: LessonIndexItem[] = [
  { label: '本レッスンの概要', time: '0:30~' },
  { label: 'プログラミングとは', time: '1:00~' },
  { label: 'PHPとはどんな言語', time: '4:00~' },
  { label: 'PHPで計算してみよう', time: '7:00~' },
  { label: 'まとめ', time: '9:00~' },
];

type LessonProps = {
  attendanceId: string;
  lessonId: string;
};

export function Lesson({ attendanceId, lessonId }: LessonProps) {
  const { attendanceDetail, error, isLoading } =
    useAttendanceDetail(attendanceId);

  // 現状はstateボタン切り替え＋ログ出力
  const [status, setStatus] = useState<LessonStatus>('before_attendance');

  const handleStatusChange = (next: LessonStatus) => {
    setStatus(next);
    console.log('lesson status changed:', next);
  };

  if (error) {
    return <p className="text-sm text-red-500">データの取得に失敗しました。</p>;
  }

  if (isLoading || !attendanceDetail) {
    return <p className="text-muted-foreground text-sm">読み込み中...</p>;
  }

  const lessonView = mapAttendanceDetailToLesson(attendanceDetail, lessonId);

  if (!lessonView) {
    return (
      <p className="text-muted-foreground text-sm">レッスンが見つかりません</p>
    );
  }

  return (
    <LessonUI
      breadcrumbs={breadcrumbs}
      chapterTitle={lessonView.chapterTitle}
      lessonTitle={lessonView.lessonTitle}
      videoUrl={lessonView.videoUrl}
      index={index}
      status={status}
      onStatusChange={handleStatusChange}
    />
  );
}
