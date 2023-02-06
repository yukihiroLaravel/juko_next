import { TitleCard } from '@/features/lesson/components/TitleCard';
import { FC } from 'react';
import { StatusIcon } from './StatusIcon';

type Props = {
  status: 'before_attendance' | 'in_attendance' | 'completed_attendance';
  title: string;
};
export const TitleStatusCard: FC<Props> = ({ title, status }) => {
  return (
    <div className="flex items-center flex-start mb-[10px]">
      <StatusIcon status={status} />
      <TitleCard title={title} />
    </div>
  );
};
