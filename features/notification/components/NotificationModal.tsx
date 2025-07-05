import { FC, useEffect, useState } from 'react';
import { useUnreadNotificationHook } from '../hooks/useUnreadNotificationHook';
import { Button } from '@/components/atoms/Button';

export const NotificationModal: FC = () => {
  const { notifications, isLoading, error } = useUnreadNotificationHook();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (notifications.length > 0) {
      setIsModalOpen(true);
    }
  }, [notifications]);

  const handleClose = () => {
    if (currentIndex < notifications.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsModalOpen(false);
    }
  };

  const currentNotification = notifications[currentIndex];

  if (!isModalOpen || !currentNotification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">{currentNotification.title}</h2>
        <p className="whitespace-pre-wrap">{currentNotification.content}</p>
        <div className="mt-6 text-right">
          <Button type="button" color="primary" clickHandler={handleClose}>
            閉じる
          </Button>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};
