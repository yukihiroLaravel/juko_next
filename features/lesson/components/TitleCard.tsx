import { FC } from 'react';

type Props = {
  title: string;
};
export const TitleCard: FC<Props> = ({ title }) => {
  return (
    <div className="bg-[#D9D9D9] min-h-[8vh] md:min-h-[10vh] w-11/12 flex justify-center items-center rounded">
      <p className="text-xl md:text-2xl">{title}</p>
    </div>
  );
};
