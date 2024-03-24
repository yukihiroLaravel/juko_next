import { SwitchButton } from '@/components/atoms/Button/SwitchButton';
import { LESSON_STATUS, Lesson } from '../types/Lesson';
import { usePutForm } from '../hooks/usePutForm';
import { Button } from '@/components/atoms/Button/Button';
import { Axios } from '@/lib/api';
import { useRef } from 'react';
import FieldInput from '@/components/atoms/Field/FieldInput';
import Link from 'next/link';

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
      className="mx-auto my-10 bg-white py-10 md:w-2/3 md:border"
      onSubmit={onSubmit}
    >
      <h2 className="text-center text-2xl">レッスン編集</h2>
      <div className="mx-auto w-4/5">
        <div className="flex items-center justify-end text-sm">
          <Link
            href={{
              pathname: '/instructor/lesson/preview',
              query: {
                courseId: courseId,
                chapterId: chapterId,
                lessonId: lesson.lesson_id,
              },
            }}
          >
            <a target="_blank" rel="noopener noreferrer">
              <Button type="button">プレビュー</Button>
            </a>
          </Link>
        </div>
        <div className="mt-10">
          <label htmlFor="title">
            <p className="mb-1 font-bold">レッスンタイトル</p>
            <FieldInput defaultValue={lesson.title} {...register('title')} />
            {errors.title && (
              <span className="text-red-600">{errors.title.message}</span>
            )}
          </label>
        </div>
        <div className="mt-10">
          <label htmlFor="url">
            <p className="mb-1 font-bold">動画URL</p>
            <FieldInput defaultValue={lesson.url} {...register('url')} />
            {errors.url && (
              <span className="text-red-600">{errors.url.message}</span>
            )}
          </label>
        </div>
        <div className="mt-10">
          <p className="mb-3 font-bold">非公開/公開</p>
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
          <p className="mb-3 font-bold">テキスト</p>
          <textarea
            className="h-40 w-full rounded border-b-2 p-2 focus:border-[#B0ABAB] focus:outline-none"
            defaultValue={lesson.remarks}
            {...register('remarks')}
          />
          {errors.remarks && (
            <span className="text-red-600">{errors.remarks.message}</span>
          )}
        </div>
        <div className="my-5 flex justify-between text-center">
          <Button type="button" color="danger" clickHandler={deleteHandler}>
            削除
          </Button>
          {isSending.current ? (
            <Button type="button" isDisabled={true}>
              更新中...
            </Button>
          ) : (
            <Button type="submit">更新</Button>
          )}
        </div>
      </div>
    </form>
  );
};
