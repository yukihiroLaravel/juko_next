import { Button } from "@/components/atoms/Button";

type Props = {
  title: string;
  content: string;
  startDate?: string;
  endDate?: string;
  onClose: () => void;
};

export const NotificationModal: React.FC<Props> = ({
  title,
  content,
  startDate,
  endDate,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-[90%] max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>

        {startDate && (
          <p className="text-sm text-gray-500 mb-1">開始日: {startDate}</p>
        )}
        {endDate && (
          <p className="text-sm text-gray-500 mb-4">終了日: {endDate}</p>
        )}

        <p className="mb-6 whitespace-pre-wrap">{content}</p>

        <div className="text-center">
          <Button type="button" size="lg" onClick={onClose}>
            閉じる
          </Button>
        </div>
      </div>
    </div>
  );
};
