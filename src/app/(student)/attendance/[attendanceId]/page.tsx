'use client';

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
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">講座詳細</span>
        </header>
        <main className="flex-1 p-4">{/* メインコンテンツ */}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
