import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/elements/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LessonCard } from '../components/LessonCard';

export const useAddLesson = () => {
  const [isShowedAddLesson, setIsShowedAddLesson] = useState<boolean>(false);
  const updateIsShowedAddLesson = () => {
    setIsShowedAddLesson(!isShowedAddLesson);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    title: string;
  }>({
    mode: 'onSubmit',
    resolver: yupResolver(
      yup.object().shape({
        title: yup
          .string()
          .required('レッスン名を入力してください')
          .max(50, '50文字以内で入力してください'),
      })
    ),
  });

  const renderAddLesson = () => {
    return isShowedAddLesson ? (
      <LessonCard status="private" cardRef={undefined} className="my-3 p-8">
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="w-1/2 border border-gray-300 rounded-md p-2"
            placeholder="レッスン名を入力"
            {...register('title')}
          />
          <div>
            <Button
              className="p-2"
              color="danger"
              clickHandler={() => setIsShowedAddLesson(!isShowedAddLesson)}
            >
              キャンセル
            </Button>
            <span className="mx-2" />
            <Button className="py-2 px-6">保存</Button>
          </div>
        </div>
        <div>
          {errors.title && (
            <span className="text-red-600">{errors.title.message}</span>
          )}
        </div>
      </LessonCard>
    ) : (
      <></>
    );
  };

  return {
    isShowedAddLesson,
    updateIsShowedAddLesson,
    handleSubmit,
    renderAddLesson,
    reset,
  };
};
