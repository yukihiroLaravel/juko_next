import Link from 'next/link';
import { CheckCircle2, Circle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/atoms/Badge';
import type { LessonListItem } from '@/features/attendance/types/lessonListItem';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from '@/components/atoms/Sidebar';

export type LessonSidebarItem = LessonListItem;

export type LessonSidebarUIProps = {
  attendanceId: string;
  progressPercent: number;
  lessons: LessonSidebarItem[];
  activeLessonId: string;
};

export function LessonSidebarUI({
  attendanceId,
  progressPercent,
  lessons,
  activeLessonId,
}: LessonSidebarUIProps) {
  return (
    <Sidebar collapsible="offcanvas">
      {/* チャプター進捗 */}
      <SidebarHeader className="gap-2 p-4">
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium">チャプター進捗</p>
          <Badge variant="secondary">{progressPercent}%</Badge>
        </div>
        <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* レッスン一覧 */}
        <SidebarGroup>
          <SidebarGroupContent>
            <ul>
              {lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                const isCompleted = lesson.status === 'completed_attendance';

                return (
                  <li key={lesson.id} className="border-b">
                    <Link
                      href={`/attendance/${attendanceId}/lessons/${lesson.id}`}
                      className="hover:bg-accent flex items-center justify-between px-3 py-3"
                    >
                      <span
                        className={cn(
                          'text-sm',
                          isCompleted && 'text-orange-500',
                          !isCompleted &&
                            isActive &&
                            'text-primary font-medium',
                          !isCompleted && !isActive && 'text-muted-foreground',
                        )}
                      >
                        {lesson.title}
                      </span>

                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-orange-500" />
                      ) : (
                        <Circle
                          className={cn(
                            'h-4 w-4',
                            isActive
                              ? 'fill-primary text-primary'
                              : 'fill-muted-foreground/40 text-muted-foreground/40',
                          )}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
