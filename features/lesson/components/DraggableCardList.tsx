import { Chapter } from '@/features/chapter/types/Chapter';
import { FC, useState } from 'react';
import { Lesson } from '../types/Lesson';
import { DraggableCard } from './DraggableCard';
import { Axios } from '@/lib/api';

type Props = {
  courseId: number;
  chapter: Chapter & {
    lessons: Lesson[];
  };
  mutate: () => void;
};

export const DraggableCardList: FC<Props> = ({ courseId, chapter, mutate }) => {
  const moveCard = async (dragIndex: number, hoverIndex: number) => {
    if (chapter.lessons === undefined) return;
    // レッスンを並び変えてAPIへ送信
    // dragIndexとhoverIndexの要素だけを入れ替える
    const newLessons = [...chapter.lessons];
    const dragCard = newLessons[dragIndex] as Lesson;
    newLessons.splice(dragIndex, 1);
    newLessons.splice(hoverIndex, 0, dragCard);

    // {lesson_id: 1, order: 1}, {lesson_id: 2, order: 2}のような形にする
    const body = newLessons.map((lesson, index) => {
      return {
        lesson_id: lesson.lesson_id,
        order: index + 1,
      };
    });

    // APIへ送信
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.post(
        `/api/v1/instructor/course/${courseId}/chapter/${chapter.chapter_id}/lesson/sort`,
        {
          lessons: body,
        }
      )
        .then(() => {
          mutate();
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    });
  };

  return (
    <>
      {chapter.lessons.map((lesson, index) => {
        return (
          <div key={lesson.lesson_id} className="my-5">
            <DraggableCard
              key={crypto.randomUUID()}
              courseId={courseId}
              chapterId={chapter.chapter_id}
              lesson={lesson}
              index={index}
              mutate={mutate}
              moveCard={moveCard}
            />
          </div>
        );
      })}
    </>
  );
};
