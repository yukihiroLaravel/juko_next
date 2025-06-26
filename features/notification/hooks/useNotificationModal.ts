import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Notification } from '../types/Notification';
import { fetcher } from '@/lib/Fetcher';

export const useNotificationModal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading } = useSWR<{ data: Notification[] }>(
    '/api/v1/notification/read',
    (url) => fetcher(url, { withCredentials: true }),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      setIsModalOpen(true);
    }
  }, [data]);

  const handleClose = () => {
    if (data?.data && currentIndex < data.data.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsModalOpen(false);
    }
  };

  const currentNotification = data?.data?.[currentIndex];

  return {
    isModalOpen,
    currentNotification,
    handleClose,
    isLoading,
    error,
  };
};
