import { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Lesson } from '../types/Lesson';
import { Button } from '@/components/elements/Button';
import { Axios } from '@/lib/api';

type Props = {
  courseId: number;
  chapterId: number;
  lesson: Lesson;
  index: number;
  mutate: () => void;
};

export const Dragcard: FC<Props> = ({
  courseId,
  chapterId,
  lesson,
  index,
  mutate,
}) => {
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
          status: 'public',
        }
      )
        .then((res) => {
          // TODO レスポンスの型を作る
          setTitle('');
          setIsClickedEditName(false);
          mutate();
        })
        .catch((error) => {
          // if (error.response.status === 422) {
          //   console.log(error.response.data.errors);
          // }
        });
    });
  };

  return (
    <Draggable
      key={lesson.lesson_id}
      draggableId={lesson.lesson_id.toString()}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="my-5">
            {/* TODO カードはコンポーネント化 */}
            <div className="bg-[#ECF7FF] shadow-md rounded-md px-8 py-10 flex justify-between items-center relative">
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
                      clickHandler={() =>
                        setIsClickedEditName(!isClickedEditName)
                      }
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
                    <li className="py-1 px-8 hover:bg-gray-200">公開</li>
                    <li className="py-1 px-8 hover:bg-gray-200">削除</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
