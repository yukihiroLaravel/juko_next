import { FC, useRef } from 'react';
import { LESSON_STATUS, Lesson } from '../types/Lesson';
import { Button } from '@/components/elements/Button';
import { Axios } from '@/lib/api';
import { useDrag, useDrop } from 'react-dnd';
import { LessonCard } from './LessonCard';
import { GridDotsIcon } from '@/components/icons/GridDotsIcon';
import Link from 'next/link';
import { useUpdateTitle } from '../hooks/useUpdateTitle';
import { DotIconDropDown } from '@/features/lesson/components/DotIconDropDown';

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

  const {
    isClickedEditTitle,
    updateIsClickedEditTitle,
    renderAddLesson,
    handleSubmit,
    errors,
    reset,
  } = useUpdateTitle({ title: lesson.title });

  const handleUpdateLesson = async (data: { title: string }) => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      // TODO パラメーター、urlとstatusは仮値
      await Axios.put(
        `/api/v1/instructor/course/${courseId}/chapter/${chapterId}/lesson/${lesson.lesson_id}`,
        {
          title: data.title,
          url: 'aaaa',
          status: LESSON_STATUS.PUBLIC,
        }
      )
        .then(() => {
          updateIsClickedEditTitle();
          mutate();
        })
        .catch((error) => {
          console.error(error);
          alert('レッスンの更新に失敗しました');
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
          alert('レッスン状態の変更に失敗しました');
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
          alert('レッスン削除に失敗しました');
        });
    });
  };

  return (
    <LessonCard
      status={lesson.status}
      className="relative flex items-center"
      cardRef={ref}
    >
      <div className="cursor-move h-full m-0 px-2 py-10 border-r border-gray-300">
        <GridDotsIcon />
      </div>
      {isClickedEditTitle ? (
        <div className="flex-col w-2/3">
          <form
            className="mx-2 flex"
            onSubmit={handleSubmit(handleUpdateLesson)}
          >
            {renderAddLesson()}
            <div className="mx-2 flex">
              <Button
                className="p-2"
                color="danger"
                clickHandler={() => {
                  updateIsClickedEditTitle();
                  reset();
                }}
              >
                キャンセル
              </Button>
              <span className="mr-2" />
              <Button className="py-2 px-6">保存</Button>
            </div>
          </form>
          {errors.title && (
            <div className="text-red-600">{errors.title.message}</div>
          )}
        </div>
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
      {!isClickedEditTitle && (
        <DotIconDropDown
          lesson={lesson}
          changeNameHandler={() => {
            updateIsClickedEditTitle();
          }}
          changeStatusHandler={() => {
            handleUpdateStatus(
              lesson.status === LESSON_STATUS.PUBLIC
                ? LESSON_STATUS.PRIVATE
                : LESSON_STATUS.PUBLIC
            );
          }}
          deleteHandler={() => {
            handleDeleteLesson();
          }}
        />
      )}
    </LessonCard>
  );
};
