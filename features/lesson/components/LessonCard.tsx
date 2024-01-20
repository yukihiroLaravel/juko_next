import { FC } from 'react';
import { LESSON_STATUS } from '../types/Lesson';
import clsx from 'clsx';

type Props = {
  status?: LESSON_STATUS;
  className?: string;
  cardRef?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
};

export const LessonCard: FC<Props> = ({
  status = LESSON_STATUS.PRIVATE,
  className,
  cardRef = undefined,
  children,
}) => {
  const cardClassName = clsx(
    'min-h-[12vh]',
    'flex',
    'justify-between',
    'items-center',
    'px-8',
    'py-10',
    'rounded',
    'text-gray-700',
    'shadow-md',
    {
      'bg-gray-200': status === LESSON_STATUS.PRIVATE,
      'bg-[#ECF7FF]': status !== LESSON_STATUS.PRIVATE,
    },
    className
  );

  return (
    <div className={cardClassName} ref={cardRef}>
      {children}
    </div>
  );
};
