import { ProgressSummary } from '@/features/attendance/components/ProgressSummary/ProgressSummary';

import { CourseSidebar } from '@/features/attendance/components/CourseSidebar/CourseSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/atoms/Sidebar';

export default function Page() {
  return (
    <SidebarProvider>
      <CourseSidebar />
      <SidebarInset>
        <main className="flex-1 p-4">
          <div className="flex space-x-2 items-center py-4">
            <SidebarTrigger />
            <h2 className="font-bold">講座詳細</h2>
          </div>
          <ProgressSummary />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
