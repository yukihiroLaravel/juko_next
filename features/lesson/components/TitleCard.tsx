import { FC } from 'react';

type Props = {
  title: string;
};
export const TitleCard: FC<Props> = ({ title }) => {
  return (
    <div className="bg-[#D9D9D9] min-h-[50px] h-auto w-11/12 ml-5 flex justify-center items-center">
      <p className="font-semibold text-[22px] md:text-[32px]">{title}</p>
    </div>
  );
};
