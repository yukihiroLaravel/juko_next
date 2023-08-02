import Image from 'next/image';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const CourseCard: FC<Props> = ({ children }) => {
  console.log(children);
  return (
    <div className="mx-[10px] lg:mx-[0px] lg:w-[300px] xl:w-[370px] h-auto border-[#100D59] border-solid border-2 rounded-[10px] overflow-hidden">
      {children}
    </div>
  );
};
