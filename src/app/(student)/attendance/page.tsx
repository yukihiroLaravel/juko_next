import { AttendancedCourseCard } from '@/features/attendance/components/AttendancedCourseCard/AttendancedCourseCard';

export default function AttendancePage() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">受講中の講座</h1>
        <AttendancedCourseCard />
    </div>
  );
}
