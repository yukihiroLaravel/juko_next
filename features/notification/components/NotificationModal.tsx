import { FC } from 'react';
import { Notification } from '../types/Notification';

type Props = {
  notification: Notification;
  onClose: () => void;
};

export const NotificationModal: FC<Props> = ({ notification, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">{notification.title}</h2>
        <p className="whitespace-pre-wrap">{notification.content}</p>

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            閉じる
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};
