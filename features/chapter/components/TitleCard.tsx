import { FC } from 'react';

type Props = {
  title: string;
};
export const TitleCard: FC<Props> = ({ title }) => {
  return (
    <div className="mt-[10px] h-[120px] bg-[#C1E5FF] text-center">
      <h3 className="font-semibold text-[36px] leading-[120px]">{title}</h3>
    </div>
  );
};
