import { FC } from 'react';
import { CHAPTER_STATUS, Chapter } from '../types/Chapter';
import clsx from 'clsx';

type Props = {
  chapter: Chapter;
  className?: string;
  cardRef: React.Ref<HTMLDivElement> | undefined;
  children: React.ReactNode;
};

export const ChapterCard: FC<Props> = ({
  chapter,
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
      'bg-gray-200': chapter.status === CHAPTER_STATUS.PRIVATE,
      'bg-[#89cada]': chapter.status !== CHAPTER_STATUS.PRIVATE,
    },
    className
  );

  return (
    <div className={cardClassName} ref={cardRef}>
      {children}
    </div>
  );
};
