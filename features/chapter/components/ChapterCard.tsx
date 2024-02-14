import { FC, useEffect } from 'react';
import { CHAPTER_STATUS } from '../types/Chapter';
import clsx from 'clsx';

type Props = {
  status?: CHAPTER_STATUS;
  className?: string;
  cardRef: React.Ref<HTMLDivElement> | undefined;
  isDragging?: boolean;
  children: React.ReactNode;
};

export const ChapterCard: FC<Props> = ({
  status = CHAPTER_STATUS.PRIVATE,
  className,
  cardRef = undefined,
  isDragging = false,
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

  useEffect(() => {
    const handleScroll = (e: DragEvent) => {
      if (!isDragging) return;

      const { clientY } = e;
      const shouldScrollUp = clientY < 100;
      const shouldScrollDown = window.innerHeight - clientY < 100;

      if (shouldScrollUp) {
        window.scrollBy(0, -10);
      } else if (shouldScrollDown) {
        window.scrollBy(0, 10);
      }
    };

    if (isDragging) {
      window.addEventListener('drag', handleScroll);
    }

    return () => {
      window.removeEventListener('drag', handleScroll);
    };
  }, [isDragging]);

  return (
    <div className={cardClassName} ref={cardRef}>
      {children}
    </div>
  );
};
