import { TitleCard } from '@/features/lesson/components/TitleCard';
import { FC } from 'react';
import { StatusIcon } from './StatusIcon';

type Props = {
  status: 'not_started' | 'in_progress' | 'completed';
  title: string;
};
export const TitleStatusCard: FC<Props> = ({ title, status }) => {
  return (
    <div className="flex flex-start mb-[10px]">
      <StatusIcon status={status} />
      <TitleCard title={title} />
    </div>
  );
};
