'use client';

import { useState } from 'react';

import { LessonStatus } from '@/features/attendance/types/lessonStatus';
import { useLesson } from '@/features/attendance/hooks/useLesson';
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
  const { attendanceDetail } = useLesson(attendanceId);

  // 受講講座のチャプターを取得
  const chapters = attendanceDetail?.course.chapters ?? [];
  const chapter = chapters.find((chapter) =>
    chapter.lessons.some((chapterLesson) => String(chapterLesson.lesson_id) === lessonId),
  );

  // チャプターに紐づく対象レッスンを取得
  const lesson = chapter?.lessons.find(
    (lesson) => String(lesson.lesson_id) === lessonId,
  );

  const chapterTitle = chapter?.title;
  const lessonTitle = lesson?.title;
  const videoUrl = lesson?.url ?? '';
  const [status, setStatus] = useState<LessonStatus>(
    lesson?.lesson_attendance?.status ?? 'before_attendance',
  );

  // 現状はstateボタン切り替え＋ログ出力
  const handleStatusChange = (next: LessonStatus) => {
    setStatus(next);
    console.log('lesson status changed:', next);
  };

  return (
    <LessonUI
      breadcrumbs={breadcrumbs}
      chapterTitle={chapterTitle}
      lessonTitle={lessonTitle}
      videoUrl={videoUrl}
      index={index}
      status={status}
      onStatusChange={handleStatusChange}
    />
  );
}
