'use client';

import { useState } from 'react';

import { LessonStatus } from '@/features/attendance/types/lessonStatus';
import { LessonUI, LessonBreadcrumbItem, LessonIndexItem } from './Lesson.ui';

// チャプタータイトル（値はダミー）
const chapterTitle = 'チャプタータイトル';

// レッスン一覧（値はダミー）
const lessons = [
  { id: '1', title: 'Lesson 1' },
  { id: '2', title: 'Lesson 2' },
  { id: '3', title: 'Lesson 3' },
  { id: '4', title: 'Lesson 4' },
];

// パンくずリスト（URLは未実装）
const breadcrumbs: LessonBreadcrumbItem[] = [
  { label: '講座分類', href: '#' },
  { label: '講座一覧', href: '#' },
  { label: 'チャプター&レッスン一覧', href: '#' },
  { label: 'レッスン' },
];

// 動画URL（値はダミー）
const videoUrl = '';

// 目次（値はダミー）
const index: LessonIndexItem[] = [
  { label: '本レッスンの概要', time: '0:30~' },
  { label: 'プログラミングとは', time: '1:00~' },
  { label: 'PHPとはどんな言語', time: '4:00~' },
  { label: 'PHPで計算してみよう', time: '7:00~' },
  { label: 'まとめ', time: '9:00~' },
];

type LessonProps = {
  lessonId: string;
};

export function Lesson({ lessonId }: LessonProps) {
  const lessonTitle =
    lessons.find((lesson) => lesson.id === lessonId)?.title ?? 'レッスン';

  const [status, setStatus] = useState<LessonStatus>('before_attendance');

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
