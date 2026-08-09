'use client';

import { toast } from 'sonner';

import type { LessonStatus } from '@/features/attendance/types/lessonStatus';
import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { useUpdateLessonStatus } from '@/features/attendance/hooks/useUpdateLessonStatus';
import { mapAttendanceDetailToLesson } from '@/features/attendance/utils/mapAttendanceDetailToLesson';
import { LoadingMessage } from '@/components/StatusMessage/LoadingMessage';
import { FetchErrorMessage } from '@/components/StatusMessage/FetchErrorMessage';
import { LessonUI, LessonIndexItem } from './Lesson.ui';

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

  if (error) {
    return <FetchErrorMessage />;
  }

  if (isLoading || !attendanceDetail) {
    return <LoadingMessage />;
  }

  const lessonView = mapAttendanceDetailToLesson(attendanceDetail, lessonId);

  if (!lessonView) {
    return (
      <p className="text-muted-foreground text-sm">レッスンが見つかりません</p>
    );
  }

  const lessonAttendanceId = lessonView.lessonAttendanceId;

  const handleStatusChange = async (next: LessonStatus) => {
    if (next === lessonView.status || lessonAttendanceId === null) {
      return;
    }

    const result = await updateLessonStatus(lessonAttendanceId, next);

    if (result.success) {
      toast.success('レッスンの状態を更新しました');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <LessonUI
      chapterTitle={lessonView.chapterTitle}
      lessonTitle={lessonView.lessonTitle}
      videoUrl={lessonView.videoUrl}
      index={index}
      status={lessonView.status}
      onStatusChange={handleStatusChange}
      canUpdate={lessonAttendanceId !== null}
      isSubmitting={isSubmitting}
    />
  );
}
