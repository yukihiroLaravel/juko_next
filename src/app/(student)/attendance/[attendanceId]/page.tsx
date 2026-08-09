'use client';

import { toast } from 'sonner';
import { ProgressSummary } from '@/features/attendance/components/ProgressSummary/ProgressSummary';
import { CourseSidebar } from '@/features/attendance/components/CourseSidebar/CourseSidebar';
import { ChapterList } from '@/features/attendance/components/ChapterList/ChapterList';
import { AttendanceBreadcrumbs } from '@/features/attendance/components/AttendanceBreadcrumbs/AttendanceBreadcrumbs';
import { Button } from '@/components/atoms/Button';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/atoms/Sidebar';
import { useCompleteAttendance } from '@/features/attendance/hooks/useCompleteAttendance';
import { useCompleteChapterLessons } from '@/features/attendance/hooks/useCompleteChapterLessons';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const attendanceId = params.attendanceId as string;
  const { completeAttendance, isSubmitting: isCompletingAttendance } =
    useCompleteAttendance(attendanceId);
  const { completeChapterLessons, isSubmitting: isCompletingChapterLessons } =
    useCompleteChapterLessons(attendanceId);
  // 完了処理の並走を防ぐため、いずれかが実行中は全ての完了ボタンを非活性にする
  const isCompleting = isCompletingAttendance || isCompletingChapterLessons;

  const handleCompleteAllChapters = async () => {
    if (
      !window.confirm('すべてのチャプターを完了状態にします。よろしいですか？')
    ) {
      return;
    }

    const result = await completeAttendance();

    if (result.success) {
      toast.success('すべてのチャプターを完了しました');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <SidebarProvider>
      <CourseSidebar attendanceId={attendanceId} />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <AttendanceBreadcrumbs attendanceId={attendanceId} />
        </header>
        <main className="flex-1 space-y-2 p-4">
          <ProgressSummary attendanceId={attendanceId} />
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleCompleteAllChapters}
              disabled={isCompleting}
            >
              {isCompletingAttendance ? '完了処理中…' : '全Chapter完了'}
            </Button>
          </div>

          {/* カリキュラム一覧 */}
          <ChapterList
            attendanceId={attendanceId}
            isCompleting={isCompleting}
            completeChapterLessons={completeChapterLessons}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
