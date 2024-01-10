import { SwitchButton } from '@/components/elements/SwitchButton';
import { LESSON_STATUS, Lesson } from '../types/Lesson';
import { usePutForm } from '../hooks/usePutForm';
import { Button } from '@/components/elements/Button';
import { Axios } from '@/lib/api';
import { useRef } from 'react';
import FieldInput from '@/components/elements/FieldInput';

type Props = {
  courseId: number;
  chapterId: number;
  lesson: Lesson;
  mutate: () => void;
};

export const EditForm: React.FC<Props> = ({
  courseId,
  chapterId,
  lesson,
  mutate,
}) => {
  const isSending = useRef<boolean>(false);

  const { register, updateValue, handleSubmit, errors } = usePutForm({
    lesson,
  });

  const updateStatus = (value: string) => {
    updateValue('status', value);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isSending.current) return;

    isSending.current = true;
    await Axios.get('/sanctum/csrf-cookie').then(() => {
      Axios.put(
        `/api/v1/instructor/course/${courseId}/chapter/${chapterId}/lesson/${lesson.lesson_id}`,
        data
      )
        .then(() => {
          isSending.current = false;
          alert('更新しました');
          mutate();
        })
        .catch((e) => {
          isSending.current = false;
          console.error(e);
          alert('更新に失敗しました');
        });
    });
  });

  const deleteHandler = () => {
    if (isSending.current) return;

    if (confirm('削除しますか？')) {
      isSending.current = true;
      Axios.get('/sanctum/csrf-cookie').then(() => {
        Axios.delete(
          `/api/v1/instructor/course/${courseId}/chapter/${chapterId}/lesson/${lesson.lesson_id}`
        )
          .then(() => {
            isSending.current = false;
            alert('削除しました');
            mutate();
          })
          .catch((e) => {
            isSending.current = false;
            console.error(e);
            if (e.response.data.message === 'This lesson has attendance.') {
              alert('受講者がいるため削除できません');
            } else {
              alert('削除に失敗しました');
            }
          });
      });
    }
  };

  return (
    <form
      className="md:w-2/3 md:border mx-auto my-10 py-10 bg-white"
      onSubmit={onSubmit}
    >
      <h2 className="text-center text-2xl">レッスン編集</h2>
      <div className="w-4/5 mx-auto">
        <div className="flex justify-end items-center text-sm">
          <Button type="button" className="py-2 px-5">
            プレビュー
          </Button>
        </div>
        <div className="mt-10">
          <label htmlFor="title">
            <p className="font-bold mb-1">レッスンタイトル</p>
            <FieldInput defaultValue={lesson.title} {...register('title')} />
            {errors.title && (
              <span className="text-red-600">{errors.title.message}</span>
            )}
          </label>
        </div>
        <div className="mt-10">
          <label htmlFor="url">
            <p className="font-bold mb-1">動画URL</p>
            <FieldInput defaultValue={lesson.url} {...register('url')} />
            {errors.url && (
              <span className="text-red-600">{errors.url.message}</span>
            )}
          </label>
        </div>
        <div className="mt-10">
          <p className="font-bold mb-3">非公開/公開</p>
          <SwitchButton
            checked={lesson.status === LESSON_STATUS.PUBLIC}
            onChange={
              lesson.status === LESSON_STATUS.PUBLIC
                ? () => updateStatus(LESSON_STATUS.PRIVATE)
                : () => updateStatus(LESSON_STATUS.PUBLIC)
            }
          />
        </div>
        <div className="mt-10">
          <p className="font-bold mb-3">テキスト</p>
          <textarea
            className="p-2 h-40 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
            defaultValue={lesson.remarks}
            {...register('remarks')}
          />
          {errors.remarks && (
            <span className="text-red-600">{errors.remarks.message}</span>
          )}
        </div>
        <div className="my-5 text-center flex justify-between">
          <Button
            type="button"
            color="danger"
            className="hover:opacity-75 py-2 px-5"
            clickHandler={deleteHandler}
          >
            削除
          </Button>
          {isSending.current ? (
            <Button
              type="button"
              className="py-2 px-5 opacity-50 cursor-not-allowed"
              isDisabled={true}
            >
              更新中...
            </Button>
          ) : (
            <Button type="submit" className="hover:opacity-75 py-2 px-5">
              更新
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
