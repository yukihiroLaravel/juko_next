import { FC, useState } from 'react';
import { CHAPTER_STATUS, Chapter } from '../types/Chapter';
import { Axios } from '@/lib/api';

type Props = {
  courseId: number;
  chapter: Chapter;
  mutate: () => void;
};
export const DragCard: FC<Props> = ({ courseId, chapter, mutate }) => {
  const [isShowedDropdownMenu, setIsShowedDropdownMenu] =
    useState<boolean>(false);

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

  return (
    <div
      className={`min-h-[12vh] flex justify-between items-center px-8 py-10 rounded text-gray-700 shadow-md relative ${
        chapter.status === CHAPTER_STATUS.PRIVATE
          ? 'bg-gray-200'
          : 'bg-[#89cada]'
      }`}
    >
      <h3 className="font-semibold text-lg md:text-3xl">{chapter.title}</h3>
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
      {isShowedDropdownMenu && (
        <div className="absolute top-20 right-10 bg-white shadow-md rounded-md z-10">
          <ul>
            <li
              className="py-1 px-8 hover:bg-gray-200"
              onClick={() => {
                // setIsClickedEditName(true);
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
    </div>
  );
};
