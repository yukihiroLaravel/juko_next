import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';
import { useState } from 'react';
import { Notification } from '../types/Notification';

type Params = {
  per_page: number;
  page: number;
};

export const useFetchNotifications = () => {
  const [params, setParams] = useState<Params>({
    per_page: 10,
    page: 1,
  });
  const updateParams = (newParams: Partial<Params>) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };
  const { data, isLoading, error, mutate } = useSWR<{
    data: {
      notifications: Notification[];
      pagination: {
        page: number;
        total: number;
      };
    };
  }>(
    `/api/v1/instructor/notification/index?page=${params.page}&per_page=${params.per_page}`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  return {
    notifications: data?.data.notifications,
    pagination: data?.data.pagination,
    isLoading,
    error,
    updateParams,
    mutate,
  };
};
