'use client';

import { useState } from 'react';

import type { LessonStatus } from '@/features/attendance/types/lessonStatus';
import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { useUpdateLessonStatus } from '@/features/attendance/hooks/useUpdateLessonStatus';
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
  const { updateLessonStatus, isSubmitting } =
    useUpdateLessonStatus(attendanceId);
  const [updateError, setUpdateError] = useState<string | null>(null);

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

  const lessonAttendanceId = lessonView.lessonAttendanceId;

  const handleStatusChange = async (next: LessonStatus) => {
    if (next === lessonView.status) {
      return;
    }

    if (lessonAttendanceId === null) {
      setUpdateError('このレッスンの状態は変更できません');
      return;
    }

    setUpdateError(null);
    const result = await updateLessonStatus(lessonAttendanceId, next);
    
    if (!result.success) {
      setUpdateError(result.error ?? 'レッスンの状態更新に失敗しました');
    }
  };

  return (
    <LessonUI
      breadcrumbs={breadcrumbs}
      chapterTitle={lessonView.chapterTitle}
      lessonTitle={lessonView.lessonTitle}
      videoUrl={lessonView.videoUrl}
      index={index}
      status={lessonView.status}
      onStatusChange={handleStatusChange}
      canUpdate={lessonAttendanceId !== null}
      isSubmitting={isSubmitting}
      errorMessage={updateError}
    />
  );
}
