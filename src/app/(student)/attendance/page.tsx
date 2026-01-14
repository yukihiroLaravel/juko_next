'use client';

import { useState } from 'react';
import { Switch } from '@/components/atoms/Switch';
import { Button } from '@/components/atoms/Button';
import { CourseSearchBox } from '@/features/attendance/components/CourseSearchBox/CourseSearchBox';
import { AttendancedCourseCardList } from '@/features/attendance/components/AttendancedCourseCardList/AttendancedCourseCardList';

export default function AttendancePage() {
  const [isGrouped, setIsGrouped] = useState(false);

  return (
    <div className="px-6 py-4">
      {/* ページ内ヘッダー（カード幅に合わせる） */}
      <div className="mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">講座一覧</h1>
          <CourseSearchBox />
        </div>
        <hr className="border-border" />
      </div>

      {/* 操作エリア */}
      <div className="mx-auto flex items-center justify-between py-2">
        <label className="flex cursor-pointer items-center gap-3">
          <Switch checked={isGrouped} onCheckedChange={setIsGrouped} />
          <span className="text-muted-foreground text-sm">分類表示</span>
        </label>
        <Button size="sm" onClick={() => console.log('全講座完了')}>
          全講座完了
        </Button>
      </div>
      <AttendancedCourseCardList />
    </div>
  );
}
