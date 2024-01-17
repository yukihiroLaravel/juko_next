import { FC } from 'react';

type Props = {
  title: string;
};
export const TitleCard: FC<Props> = ({ title }) => {
  return (
    <div className="min-h-[12vh] bg-[#89cada] flex justify-center items-center px-8 py-10 rounded text-gray-700 shadow-md">
      <h3 className="font-semibold text-lg md:text-3xl">{title}</h3>
    </div>
  );
};
