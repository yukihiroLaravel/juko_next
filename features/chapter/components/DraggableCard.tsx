import { FC, useRef, useState } from 'react';
import { CHAPTER_STATUS, Chapter } from '../types/Chapter';
import { Axios } from '@/lib/api';
import { ChapterCard } from './ChapterCard';
import { useDrag, useDrop } from 'react-dnd';
import { DotsIcon } from '@/components/icons/DotsIcon';
import { GridDotsIcon } from '@/components/icons/GridDotsIcon';
import { Button } from '@/components/elements/Button';

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
  const [, drag] = useDrag(() => ({
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

  const [isShowedDropdownMenu, setIsShowedDropdownMenu] =
    useState<boolean>(false);

  const [title, setTitle] = useState<string>(chapter.title);

  const [isClickedEditName, setIsClickedEditName] = useState<boolean>(false);

  const handelChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUpdateStatus = async (status: CHAPTER_STATUS) => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.patch(
        `/api/v1/instructor/course/${courseId}/chapter/${chapter.chapter_id}/status`,
        {
          status,
        }
      )
        .then((res) => {
          // TODO レスポンスの型を作る
          console.log(res.data);
          mutate();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            console.log(error.response.data.errors);
          }
        });
    });
  };

  const handleDeleteLesson = async () => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.delete(
        `/api/v1/instructor/course/${courseId}/chapter/${chapter.chapter_id}`
      )
        .then((res) => {
          // TODO レスポンスの型を作る
          console.log(res.data);
          mutate();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            console.log(error.response.data.errors);
          }
        });
    });
  };

  const handleUpdateTitle = async () => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.patch(
        `/api/v1/instructor/course/${courseId}/chapter/${chapter.chapter_id}`,
        {
          title,
        }
      )
        .then((res) => {
          // TODO レスポンスの型を作る
          console.log(res.data);
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

  return (
    <ChapterCard
      chapter={chapter}
      className="relative flex items-center justify-between"
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
        <input
          type="text"
          className="w-2/3 border border-gray-300 rounded-md p-2 text-xl"
          placeholder="チャプター名を入力"
          value={title}
          onChange={handelChangeTitle}
        />
      ) : (
        <h3 className="font-semibold text-lg md:text-3xl">{chapter.title}</h3>
      )}
      {isClickedEditName && (
        <div className="mx-2">
          <Button
            className="p-2"
            type="button"
            color="danger"
            clickHandler={() => {
              setIsClickedEditName(false);
            }}
          >
            キャンセル
          </Button>
          <span className="mr-2" />
          <Button className="p-2 px-6" clickHandler={handleUpdateTitle}>
            保存
          </Button>
        </div>
      )}
      {!isClickedEditName && (
        <button
          className="p-4"
          onClick={() => setIsShowedDropdownMenu(!isShowedDropdownMenu)}
        >
          <DotsIcon />
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
                  chapter.status === CHAPTER_STATUS.PUBLIC
                    ? CHAPTER_STATUS.PRIVATE
                    : CHAPTER_STATUS.PUBLIC
                );
                setIsShowedDropdownMenu(false);
              }}
            >
              {chapter.status === CHAPTER_STATUS.PUBLIC ? '非公開' : '公開'}
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
    </ChapterCard>
  );
};
