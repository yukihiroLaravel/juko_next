import { ProgressBar } from '@/components/elements/ProgressBar';
import { Course } from '../types/Course';
import { Attendance } from '@/features/attendance/types/Attendance';

type Props = {
  course: Course & {
    attendance: Attendance;
  };
};

export const ProgressCard: React.FC<Props> = ({ course }) => {
  return (
    <div className="bg-[#33B8D9] w-full text-center rounded">
      <p className="font-semibold text-2xl py-5">{course.title}</p>
      <ProgressBar progress={course.attendance.progress} />
      <p className="text-xl py-5">{course.attendance.progress}% 完了</p>
    </div>
  );
};
