import { FC } from 'react';

type Props = {
  progress: number;
};
export const ProgressBar: FC<Props> = ({ progress }) => {
  return (
    <div className="w-4/5 bg-gray-200 rounded-full h-2.5 mx-auto">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: progress + '%' }}></div>
    </div>
  );
};
