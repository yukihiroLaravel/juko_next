import { FC } from 'react';

type Props = {
  title: string;
};
export const TitleCard: FC<Props> = ({ title }) => {
  return (
    <div className="bg-[#D9D9D9] w-11/12 ml-5 h-[50px]">
      <p className="leading-[50px] font-semibold text-[32px]">{title}</p>
    </div>
  );
};
