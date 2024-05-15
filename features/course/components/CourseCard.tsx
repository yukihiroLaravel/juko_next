import Image from 'next/image';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const CourseCard: FC<Props> = ({ children }) => {
  return (
    <div className="mx-[10px] h-auto overflow-hidden rounded-[10px] border-2 border-solid border-[#100D59] bg-white lg:mx-[0px] lg:w-[300px] xl:w-[370px]">
      {children}
    </div>
  );
};
