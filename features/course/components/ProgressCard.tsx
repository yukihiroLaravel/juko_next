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
    <div className="bg-[#89cada] w-full text-center rounded text-gray-700">
      <p className="font-semibold text-2xl py-5 ">{course.title}</p>
      <ProgressBar progress={course.attendance.progress} />
      <p className="text-xl py-5">{course.attendance.progress}% 完了</p>
    </div>
  );
};
