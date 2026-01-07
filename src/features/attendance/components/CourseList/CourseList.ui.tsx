"use client";

import { Switch } from "@/components/atoms/Switch";
import { Button } from "@/components/ui/button";
import { AttendancedCourseCard } from "../AttendancedCourseCard/AttendancedCourseCard";

type Course = {
  id: string;
  title: string;
  instructorName: string;
  progress: number;
  isExpired: boolean;
};

type CourseListUIProps = {
  courses: Course[];
  isGrouped: boolean;
  onToggleGrouped: (checked: boolean) => void;
  onCompleteAll: () => void;
};

export function CourseListUI({
  courses,
  isGrouped,
  onToggleGrouped,
  onCompleteAll,
}: CourseListUIProps) {
  return (
    <div className="space-y-6">
      {/* 操作エリア（カード幅に合わせる） */}
      <div className="mx-auto flex max-w-[1100px] items-center justify-between">
        {/* 分類表示トグル */}
        <label className="flex items-center gap-3 cursor-pointer">
          <Switch
            checked={isGrouped}
            onCheckedChange={onToggleGrouped}
          />
          <span className="text-sm text-muted-foreground">
            分類表示
          </span>
        </label>

        {/* 全講座完了ボタン */}
        <Button size="sm" onClick={onCompleteAll}>
          全講座完了
        </Button>
      </div>

      {/* カード一覧 */}
      <div className="mx-auto grid max-w-[1100px] gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <AttendancedCourseCard
            key={course.id}
            title={course.title}
            instructorName={course.instructorName}
            progress={course.progress}
            isExpired={course.isExpired}
          />
        ))}
      </div>
    </div>
  );
}
