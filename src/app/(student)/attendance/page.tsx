import { CourseSearchBox } from "@/features/attendance/components/CourseSearchBox/CourseSearchBox";
import { CourseList } from "@/features/attendance/components/CourseList/CourseList";

export default function AttendancePage() {
  return (
    <div className="px-6 py-4">
      {/* ページ内ヘッダー（カード幅に合わせる） */}
      <div className="mx-auto max-w-[1100px] space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">講座一覧</h1>
          <CourseSearchBox />
        </div>

        <div className="h-px w-full bg-border" />
      </div>

      {/* CourseList も同じ幅 */}
      <div className="mt-8">
        <CourseList />
      </div>
    </div>
  );
}

