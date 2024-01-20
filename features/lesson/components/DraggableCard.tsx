import { FC, useRef, useState } from 'react';
import { LESSON_STATUS, Lesson } from '../types/Lesson';
import { Button } from '@/components/elements/Button';
import { Axios } from '@/lib/api';
import { useDrag, useDrop } from 'react-dnd';
import { LessonCard } from './LessonCard';
import { GridDotsIcon } from '@/components/icons/GridDotsIcon';
import { DotsIcon } from '@/components/icons/DotsIcon';
import Link from 'next/link';

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

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUpdateLesson = async () => {
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
        .then(() => {
          mutate();
        })
        .catch((error) => {
          console.error(error);
          alert('講座の状態の変更に失敗しました');
        });
    });
  };

  const handleDeleteLesson = async () => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.delete(
        `/api/v1/instructor/course/${courseId}/chapter/${chapterId}/lesson/${lesson.lesson_id}`
      )
        .then(() => {
          mutate();
        })
        .catch((error) => {
          console.error(error);
          alert('講座の削除に失敗しました');
        });
    });
  };

  return (
    <LessonCard
      status={lesson.status}
      className="relative flex items-center"
      cardRef={ref}
    >
      <div
        className="cursor-move h-full m-0 px-2 py-10 border-r border-gray-300"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <GridDotsIcon />
      </div>
      {isClickedEditName ? (
        <>
          <input
            type="text"
            className="w-2/3 border border-gray-300 rounded-md p-2 text-xl"
            placeholder="レッスン名を入力"
            value={title}
            onChange={handleChangeTitle}
          />
        </>
      ) : (
        <Link
          key={lesson.lesson_id}
          href={`/instructor/lesson/edit?course_id=${courseId}&chapter_id=${chapterId}&lesson_id=${lesson.lesson_id}`}
        >
          <p className="text-xl w-11/12 pl-5 py-10 overflow-auto">
            {lesson.title}
          </p>
        </Link>
      )}
      {!isClickedEditName && (
        <button
          className="pr-4"
          onClick={() => setIsShowedDropdownMenu(!isShowedDropdownMenu)}
        >
          <DotsIcon />
        </button>
      )}
      {isClickedEditName && (
        <div className="mx-2">
          <Button
            className="p-2"
            color="danger"
            clickHandler={() => setIsClickedEditName(!isClickedEditName)}
          >
            キャンセル
          </Button>
          <span className="mr-2" />
          <Button
            className="py-2 px-6"
            clickHandler={() => {
              handleUpdateLesson();
            }}
          >
            保存
          </Button>
        </div>
      )}
      {isShowedDropdownMenu && (
        <div className="absolute top-20 right-5 bg-white shadow-md rounded-md z-10">
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
  );
};
