import { TitleCard } from '@/features/lesson/components/TitleCard';
import { FC } from 'react';
import { StatusIcon } from './StatusIcon';

type Props = {
  status: 'not_started' | 'in_progress' | 'completed';
  title: string;
};
export const TitleStatusCard: FC<Props> = ({ title, status }) => {
  return (
    <div className="flex items-center flex-start mb-[10px]">
      <StatusIcon status={status} size="30px" />
      <TitleCard title={title} />
    </div>
  );
};
