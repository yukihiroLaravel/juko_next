import type { Chapter } from '@/features/attendance/types/attendanceDetail';

export const attendanceDetailMock: Chapter[] = [
  {
    chapter_id: 'chapter-1',
    title: '第1章 はじめに',
    lessons: [
      {
        lesson_id: 'lesson-1',
        title: 'レッスン1',
        is_completed: true,
      },
      {
        lesson_id: 'lesson-2',
        title: 'レッスン2',
        is_completed: false,
      },
    ],
  },
  {
    chapter_id: 'chapter-2',
    title: '第2章 応用',
    lessons: [
      {
        lesson_id: 'lesson-3',
        title: 'レッスン3',
        is_completed: false,
      },
    ],
  },
];