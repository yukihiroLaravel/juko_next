import Image from 'next/image';
import { FC } from 'react';
import { InstructorCourse } from '@/features/course/types/InstructorCourse';

type Props = {
  instructorCourse: InstructorCourse;
};
const InstructorCourseCard: FC<Props> = (props) => {
  const { instructorCourse } = props;
  return (
    <div className="mx-[10px] lg:mx-[0px] lg:w-[300px] xl:w-[370px] h-auto border-[#100D59] border-solid border-2 rounded-[10px] overflow-hidden">
      <div className="h-auto">
        <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + instructorCourse.image} alt="course" height={360} width={640} />
      </div>
      <div className="h-auto  ml-[13px] mt-[16px]">
        <p className="font-semibold text-[16px] mb-[16px]">{instructorCourse.title}</p>
      </div>
    </div>
  );
};

export default InstructorCourseCard;
