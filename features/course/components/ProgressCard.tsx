import { ProgressBar } from '@/components/atoms/ProgressBar/ProgressBar';
import { Course } from '../types/Course';
import { Attendance } from '@/features/attendance/types/Attendance';

type Props = {
  attendance: Attendance & {
    course: Course;
  };
};

export const ProgressCard: React.FC<Props> = ({ attendance }) => {
  return (
    <div className="w-full rounded bg-[#89cada] text-center text-gray-700">
      <p className="py-5 text-2xl font-semibold ">{attendance.course.title}</p>
      <ProgressBar progress={attendance.progress} />
      <p className="py-5 text-xl">{attendance.progress}% 完了</p>
    </div>
  );
};
