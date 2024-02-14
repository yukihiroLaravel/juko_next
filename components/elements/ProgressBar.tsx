import { FC } from 'react';

type Props = {
  progress: number;
};
export const ProgressBar: FC<Props> = ({ progress }) => {
  return (
    <div className="mx-auto h-2.5 w-4/5 rounded-full bg-gray-200">
      <div
        className="h-2.5 rounded-full bg-blue-600"
        style={{ width: progress + '%' }}
      ></div>
    </div>
  );
};
