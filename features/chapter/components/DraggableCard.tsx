import { FC, useRef, useState } from 'react';
import { CHAPTER_STATUS, Chapter } from '../types/Chapter';
import { Axios } from '@/lib/api';
import { ChapterCard } from './ChapterCard';
import { useDrag, useDrop } from 'react-dnd';
import { GridDotsIcon } from '@/components/icons/GridDotsIcon';
import { Button } from '@/components/atoms/Button/Button';
import { useUpdateTitle } from '../hooks/useUpdateTitle';
import { DotIconDropDown } from './DotIconDropDown';

type Props = {
  courseId: number;
  chapterIndex: number;
  chapter: Chapter;
  mutate: () => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

export const DraggableCard: FC<Props> = ({
  courseId,
  chapterIndex,
  chapter,
  mutate,
  moveCard,
}) => {
  const {
    isClickedEditTitle,
    updateIsClickedEditTitle,
    renderUpdateChapter,
    handleSubmit,
    errors,
    reset,
  } = useUpdateTitle({ title: chapter.title });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { id: chapter.chapter_id, index: chapterIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'card',
    drop(item: { id: number; index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = chapterIndex;
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

  const handleUpdateStatus = async (status: CHAPTER_STATUS) => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.patch(
        `/api/v1/instructor/course/${courseId}/chapter/${chapter.chapter_id}/status`,
        {
          status,
        }
      )
        .then(() => {
          mutate();
        })
        .catch((error) => {
          console.error(error);
          alert('チャプターの公開設定の変更に失敗しました');
        });
    });
  };

  const handleDeleteLesson = async () => {
    if (!confirm('削除してもよろしいですか？')) return;
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.delete(
        `/api/v1/instructor/course/${courseId}/chapter/${chapter.chapter_id}`
      )
        .then(() => {
          mutate();
        })
        .catch((error) => {
          console.error(error);
          alert('チャプターの削除に失敗しました');
        });
    });
  };

  const handleUpdateTitle = async (data: { title: string }) => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.patch(
        `/api/v1/instructor/course/${courseId}/chapter/${chapter.chapter_id}`,
        {
          title: data.title,
        }
      )
        .then(() => {
          updateIsClickedEditTitle();
          mutate();
        })
        .catch((error) => {
          console.error(error);
          alert('チャプター名の変更に失敗しました');
        });
    });
  };

  return (
    <ChapterCard
      status={chapter.status}
      className={`relative flex items-center ${
        isClickedEditTitle ? '' : 'justify-between'
      }`}
      cardRef={ref}
      isDragging={isDragging}
    >
      <div
        className="m-0 h-full cursor-move border-r border-gray-300 px-2 py-10"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <GridDotsIcon />
      </div>
      {isClickedEditTitle ? (
        <div className="ml-2 w-2/3 flex-col">
          <form className="flex" onSubmit={handleSubmit(handleUpdateTitle)}>
            {renderUpdateChapter()}
            <div className="mx-2 flex">
              <Button
                size="sm"
                color="danger"
                clickHandler={() => {
                  updateIsClickedEditTitle();
                  reset();
                }}
              >
                キャンセル
              </Button>
              <span className="mr-2" />
              <Button size="md" type="submit">
                保存
              </Button>
            </div>
          </form>
          {errors.title && (
            <div className="text-red-600">{errors.title.message}</div>
          )}
        </div>
      ) : (
        <h3 className="text-lg font-semibold md:text-3xl">{chapter.title}</h3>
      )}
      {!isClickedEditTitle && (
        <DotIconDropDown
          chapter={chapter}
          changeNameHandler={() => {
            updateIsClickedEditTitle();
          }}
          changeStatusHandler={() => {
            handleUpdateStatus(
              chapter.status === CHAPTER_STATUS.PUBLIC
                ? CHAPTER_STATUS.PRIVATE
                : CHAPTER_STATUS.PUBLIC
            );
          }}
          deleteHandler={() => {
            handleDeleteLesson();
          }}
        />
      )}
    </ChapterCard>
  );
};
