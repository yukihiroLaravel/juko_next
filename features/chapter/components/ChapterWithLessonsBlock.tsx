import { FC, useState } from 'react';
import { Chapter } from '../types/Chapter';
import { Button } from '@/components/elements/Button';
import { DrugCard } from '@/features/lesson/components/DrugCard';
import { TitleCard as ChapterTitleCard } from '@/features/chapter/components/TitleCard';
import { Lesson } from '@/features/lesson/types/Lesson';
import { Axios } from '@/lib/api';

type Props = {
  courseId: number;
  chapter: Chapter & {
    lessons: Lesson[];
  };
  mutate: () => void;
};

export const ChapterWithLessonsBlock: FC<Props> = ({
  courseId,
  chapter,
  mutate,
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
        <ChapterTitleCard title={chapter.title} />
      </div>
      <div className="my-5 mx-auto w-11/12">
        <DrugCard chapter={chapter} />
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
            className="p-2"
            clickHandler={() => setIsShowedAddLesson(!isShowedAddLesson)}
          >
            レッスンを追加
          </Button>
        )}
      </div>
    </div>
  );
};
