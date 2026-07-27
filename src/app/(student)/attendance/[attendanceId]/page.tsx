'use client';

import { ProgressSummary } from '@/features/attendance/components/ProgressSummary/ProgressSummary';
import { CourseSidebar } from '@/features/attendance/components/CourseSidebar/CourseSidebar';
import { ChapterList } from '@/features/attendance/components/ChapterList/ChapterList';
import { Button } from '@/components/atoms/Button';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/atoms/Sidebar';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const attendanceId = params.attendanceId as string;

  return (
    <SidebarProvider>
      <CourseSidebar attendanceId={attendanceId} />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">講座詳細</span>
        </header>
        <main className="flex-1 space-y-2 p-4">
          <ProgressSummary />
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => console.log('all chapters completed')}
            >
              全Chapter完了
            </Button>

            <Button
              type="button"
              onClick={() => console.log('all lessons completed')}
            >
              全Lesson完了
            </Button>
          </div>

          {/* カリキュラム一覧 */}
          <ChapterList attendanceId={attendanceId} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
