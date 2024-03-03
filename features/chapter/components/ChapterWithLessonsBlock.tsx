import { FC } from 'react';
import { Chapter } from '../types/Chapter';
import { Button } from '@/components/atoms/Button/Button';
import { DraggableCardList as LessonDraggableCardList } from '@/features/lesson/components/DraggableCardList';
import { Lesson } from '@/features/lesson/types/Lesson';
import { Axios } from '@/lib/api';
import { DraggableCard as ChapterDraggableCard } from './DraggableCard';
import { CirclePlusIcon } from '@/components/icons/CirclePlusIcon';
import { useAddLesson } from '@/features/lesson/hooks/useAddLesson';

type Props = {
  courseId: number;
  chapterIndex: number;
  chapter: Chapter & {
    lessons: Lesson[];
  };
  mutate: () => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

export const ChapterWithLessonsBlock: FC<Props> = ({
  courseId,
  chapterIndex,
  chapter,
  mutate,
  moveCard,
}) => {
  const {
    isShowedAddLesson,
    updateIsShowedAddLesson,
    handleSubmit,
    renderAddLesson,
    reset,
  } = useAddLesson();
  const handleAddLesson = async (data: { title: string }) => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.post(
        `/api/v1/instructor/course/${courseId}/chapter/${chapter.chapter_id}/lesson`,
        {
          title: data.title,
        }
      )
        .then(() => {
          updateIsShowedAddLesson();
          reset();
          mutate();
        })
        .catch((error) => {
          console.error(error);
          alert('レッスンの作成に失敗しました');
        });
    });
  };

  return (
    <div key={chapter.chapter_id}>
      <div className="my-3">
        <ChapterDraggableCard
          courseId={courseId}
          chapterIndex={chapterIndex}
          chapter={chapter}
          mutate={mutate}
          moveCard={moveCard}
        />
      </div>
      <div className="mx-auto my-5 w-11/12">
        <LessonDraggableCardList
          courseId={courseId}
          chapter={chapter}
          mutate={mutate}
        />
        <form onSubmit={handleSubmit(handleAddLesson)}>
          {renderAddLesson()}
        </form>
        {!isShowedAddLesson && (
          <Button size="sm" clickHandler={updateIsShowedAddLesson}>
            <div className="flex items-center justify-center gap-1">
              <CirclePlusIcon strokeWidth={1} />
              レッスン作成
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};
