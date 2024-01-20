import { FC, useState } from 'react';
import { Chapter } from '../types/Chapter';
import { Button } from '@/components/elements/Button';
import { DraggableCardList as LessonDraggableCardList } from '@/features/lesson/components/DraggableCardList';
import { Lesson } from '@/features/lesson/types/Lesson';
import { Axios } from '@/lib/api';
import { DraggableCard as ChapterDraggableCard } from './DraggableCard';
import { CirclePlusIcon } from '@/components/icons/CirclePlusIcon';

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
  const [isShowedAddLesson, setIsShowedAddLesson] = useState<boolean>(false);

  // TODO React Hook Formを使うかも
  const [title, setTitle] = useState<string>('');

  const handleAddLesson = async () => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.post(
        `/api/v1/instructor/course/${courseId}/chapter/${chapter.chapter_id}/lesson`,
        {
          title,
        }
      )
        .then((res) => {
          if (res.data.result === true) {
            setTitle('');
            setIsShowedAddLesson(false);
            mutate();
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            console.log(error.response.data.errors);
          }
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
      <div className="my-5 mx-auto w-11/12">
        <LessonDraggableCardList
          courseId={courseId}
          chapter={chapter}
          mutate={mutate}
        />
        {isShowedAddLesson && (
          <div className="my-5">
            <div className="bg-[#ECF7FF] shadow-md rounded-md p-8 flex justify-between items-center">
              <input
                type="text"
                className="w-1/2 border border-gray-300 rounded-md p-2"
                placeholder="レッスン名を入力"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div>
                <Button className="py-2 px-6" clickHandler={handleAddLesson}>
                  保存
                </Button>
                <span className="mx-2" />
                <Button
                  className="p-2"
                  color="danger"
                  clickHandler={() => setIsShowedAddLesson(!isShowedAddLesson)}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          </div>
        )}
        {!isShowedAddLesson && (
          <Button
            className="p-2 flex items-center"
            clickHandler={() => setIsShowedAddLesson(!isShowedAddLesson)}
          >
            <CirclePlusIcon strokeWidth={1} />
            レッスン作成
          </Button>
        )}
      </div>
    </div>
  );
};
