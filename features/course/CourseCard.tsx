import { FC } from 'react';
import { Course } from '@/types/Course';

type Props = {
  course: Course;
};
const CourseCard: FC<Props> = (props) => {
  const { course } = props;
  return (
    <a href="#">
      <div className="mx-[10px] lg:mx-[0px] lg:w-[300px] xl:w-[370px] h-auto border-[#100D59] border-solid border-2 rounded-[10px] overflow-hidden">
        <div className="bg-purple-500 h-[210px]">{/* <img src="" alt="" /> */}</div>
        <div className="h-auto  ml-[13px] mt-[16px]">
          <p className="font-semibold text-[16px] mb-[16px]">{course.title}</p>
          <p className="font-semibold text-[16px] mb-[16px]">
            講師 : {course.instructor.last_name} {course.instructor.first_name}
          </p>
          <p className="font-semibold text-[16px] mb-[16px]">進捗 {course.attendance.progress}%</p>
        </div>
      </div>
    </a>
  );
};

export default CourseCard;
