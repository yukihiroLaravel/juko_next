import { FC, useRef, useState } from 'react';
import { LESSON_STATUS, Lesson } from '../types/Lesson';
import { Button } from '@/components/elements/Button';
import { Axios } from '@/lib/api';
import { useDrag, useDrop } from 'react-dnd';
import { LessonCard } from './LessonCard';

type Props = {
  courseId: number;
  chapterId: number;
  lesson: Lesson;
  index: number;
  mutate: () => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

export const DraggableCard: FC<Props> = ({
  courseId,
  chapterId,
  lesson,
  index,
  mutate,
  moveCard,
}) => {
  const [, drag] = useDrag(() => ({
    type: 'LessonCard',
    item: { id: lesson.lesson_id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'LessonCard',
    drop(item: { id: number; index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // 同じカードをオーバーしている場合は無視
      if (dragIndex === hoverIndex) {
        return;
      }
      // カードを並び替える
      moveCard(dragIndex, hoverIndex);
    },
  }));

  const ref = useRef(null);
  drag(drop(ref));

  const [isShowedDropdownMenu, setIsShowedDropdownMenu] =
    useState<boolean>(false);

  const [title, setTitle] = useState<string>(lesson.title);

  const [isClickedEditName, setIsClickedEditName] = useState<boolean>(false);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddLesson = async () => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      // TODO パラメーター、urlとstatusは仮値
      // TODO React Hook Formを使うかも
      await Axios.put(
        `/api/v1/instructor/course/${courseId}/chapter/${chapterId}/lesson/${lesson.lesson_id}`,
        {
          title,
          url: 'aaaa',
          status: LESSON_STATUS.PUBLIC,
        }
      )
        .then((res) => {
          // TODO レスポンスの型を作る
          setTitle('');
          setIsClickedEditName(false);
          mutate();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            console.log(error.response.data.errors);
          }
        });
    });
  };

  const handleUpdateStatus = async (status: LESSON_STATUS) => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.put(
        `/api/v1/instructor/course/${courseId}/chapter/${chapterId}/lesson/${lesson.lesson_id}`,
        {
          title: lesson.title,
          url: 'aaaa',
          status: status,
        }
      )
        .then((res) => {
          // TODO レスポンスの型を作る
          mutate();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            console.log(error.response.data.errors);
          }
          alert('エラーが発生しました');
        });
    });
  };

  const handleDeleteLesson = async () => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.delete(
        `/api/v1/instructor/course/${courseId}/chapter/${chapterId}/lesson/${lesson.lesson_id}`
      )
        .then((res) => {
          // TODO レスポンスの型を作る
          mutate();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            console.log(error.response.data.errors);
          }
          alert('エラーが発生しました');
        });
    });
  };

  return (
    <div className="my-5">
      <LessonCard status={lesson.status} className="relative" cardRef={ref}>
        {isClickedEditName ? (
          <>
            <input
              type="text"
              className="w-1/2 border border-gray-300 rounded-md p-2 text-xl"
              placeholder="レッスン名を入力"
              value={title}
              onChange={handleChangeName}
            />
            <div>
              <Button
                className="py-2 px-6"
                clickHandler={() => {
                  handleAddLesson();
                }}
              >
                保存
              </Button>
              <span className="mx-2" />
              <Button
                className="p-2"
                color="danger"
                clickHandler={() => setIsClickedEditName(!isClickedEditName)}
              >
                キャンセル
              </Button>
            </div>
          </>
        ) : (
          <span className="text-xl">{lesson.title}</span>
        )}
        {!isClickedEditName && (
          <button
            className="p-2"
            onClick={() => setIsShowedDropdownMenu(!isShowedDropdownMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-dots-vertical text-gray-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            </svg>
          </button>
        )}
        {isShowedDropdownMenu && (
          <div className="absolute top-20 right-10 bg-white shadow-md rounded-md z-10">
            <ul>
              <li
                className="py-1 px-8 hover:bg-gray-200"
                onClick={() => {
                  setIsClickedEditName(true);
                  setIsShowedDropdownMenu(false);
                }}
              >
                名前変更
              </li>
              <li
                className="py-1 px-8 hover:bg-gray-200"
                onClick={() => {
                  handleUpdateStatus(
                    lesson.status === LESSON_STATUS.PUBLIC
                      ? LESSON_STATUS.PRIVATE
                      : LESSON_STATUS.PUBLIC
                  );
                  setIsShowedDropdownMenu(false);
                }}
              >
                {lesson.status === LESSON_STATUS.PUBLIC ? '非公開' : '公開'}
              </li>
              <li
                className="py-1 px-8 hover:bg-gray-200"
                onClick={() => {
                  handleDeleteLesson();
                  setIsShowedDropdownMenu(false);
                }}
              >
                削除
              </li>
            </ul>
          </div>
        )}
      </LessonCard>
    </div>
  );
};
