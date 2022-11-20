import { FC } from 'react';

type Props = {
  title: string;
};
export const TitleCard: FC<Props> = ({ title }) => {
  return (
    <div className="mt-[10px] min-h-[120px] h-auto bg-[#C1E5FF] flex justify-center items-center">
      <h3 className="font-semibold text-[26px] md:text-[36px]">{title}</h3>
    </div>
  );
};
