import { CheckCircle, Circle } from 'lucide-react';

type LessonItemUIProps = {
  title: string;
  isCompleted: boolean;
};

export function LessonItemUI({ title, isCompleted }: LessonItemUIProps) {
  return (
    <div className="flex items-center gap-2 border-b px-3 py-2">
      {isCompleted ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <Circle className="h-5 w-5 text-gray-400" />
      )}
      <span className={isCompleted ? 'text-gray-400 line-through' : ''}>
        {title}
      </span>
    </div>
  );
}
