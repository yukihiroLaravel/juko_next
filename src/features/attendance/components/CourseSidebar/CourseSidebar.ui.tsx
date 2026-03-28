import Link from 'next/link';
import { BellIcon, UsersIcon } from 'lucide-react';

import { Badge } from '@/components/atoms/Badge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/atoms/Sidebar';

export type CourseSidebarUIProps = {
  thumbnailUrl: string;
  categoryName: string;
  courseName: string;
  progressPercent: number;
};

export function CourseSidebarUI({
  thumbnailUrl,
  categoryName,
  courseName,
  progressPercent,
}: CourseSidebarUIProps) {
  return (
    <Sidebar collapsible="offcanvas">
      {/* サムネイル・講座情報 */}
      <SidebarHeader className="gap-0 p-0">
        <img
          src={thumbnailUrl}
          alt={courseName}
          width={256}
          height={144}
          className="w-full object-cover"
        />
        <div className="p-4">
          <p className="text-muted-foreground text-sm">{categoryName}</p>
          <h2 className="text-base font-semibold">{courseName}</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* 進捗 */}
        <SidebarGroup>
          <SidebarGroupLabel>進捗状況</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex items-center gap-2 px-2">
              <span className="text-sm">進捗率</span>
              <Badge variant="secondary">{progressPercent}%</Badge>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ナビゲーション */}
        <SidebarGroup>
          <SidebarGroupLabel>メニュー</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="受講生一覧">
                  <Link href="#">
                    <UsersIcon />
                    <span>受講生一覧</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="お知らせ一覧">
                  <Link href="/notifications">
                    <BellIcon />
                    <span>お知らせ一覧</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
