import { FC } from 'react';
import { CHAPTER_STATUS } from '../types/Chapter';
import clsx from 'clsx';

type Props = {
  status?: CHAPTER_STATUS;
  className?: string;
  cardRef: React.Ref<HTMLDivElement> | undefined;
  children: React.ReactNode;
};

export const ChapterCard: FC<Props> = ({
  status = CHAPTER_STATUS.PRIVATE,
  className,
  cardRef = undefined,
  children,
}) => {
  const cardClassName = clsx(
    'min-h-[12vh]',
    'rounded',
    'text-gray-700',
    'shadow-md',
    {
      'bg-gray-200': status === CHAPTER_STATUS.PRIVATE,
      'bg-[#89cada]': status !== CHAPTER_STATUS.PRIVATE,
    },
    className
  );

  return (
    <div className={cardClassName} ref={cardRef}>
      {children}
    </div>
  );
};
