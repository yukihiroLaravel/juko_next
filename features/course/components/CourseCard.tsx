import Image from 'next/image';
import { FC } from 'react';
import { Course } from '@/features/course/types/Course';

type Props = {
  course: Course;
};
const CourseCard: FC<Props> = (props) => {
  const { course } = props;
  return (
    <div className="mx-[10px] lg:mx-[0px] lg:w-[300px] xl:w-[370px] h-auto border-[#100D59] border-solid border-2 rounded-[10px] overflow-hidden">
      <div className="h-auto">
        <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + course.image} alt="course" height={360} width={640} />
      </div>
      <div className="h-auto  ml-[13px] mt-[16px]">
        <p className="font-semibold text-[16px] mb-[16px]">{course.title}</p>
        <p className="font-semibold text-[16px] mb-[16px]">
          講師 : {course.instructor.last_name} {course.instructor.first_name}
        </p>
        <p className="font-semibold text-[16px] mb-[16px]">進捗 {course.attendance.progress}%</p>
      </div>
    </div>
  );
};

export default CourseCard;
