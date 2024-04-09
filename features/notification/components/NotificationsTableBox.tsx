import { FC } from 'react';
import { NotificationsTable } from './NotificationsTable';
import { Pagination } from '@/components/atoms/Pagination/Pagination';
import { useFetchNotifications } from '../hooks/useFetchNotifications';
import { useRouter } from 'next/router';

export const NotificationsTableBox: FC = () => {
  const router = useRouter();
  const { notifications, pagination, updateParams } = useFetchNotifications();

  return (
    <>
      {notifications && (
        <NotificationsTable notifications={notifications}/>
      )}
      <Pagination
        total={pagination?.total ?? 0}
        currentPage={pagination?.page ?? 0}
        goToPage={(page: number) => {
          updateParams({ page });
        }}
      />
    </>
  );
};
