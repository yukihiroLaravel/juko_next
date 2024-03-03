import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChapterCard } from '../components/ChapterCard';
import { Button } from '@/components/atoms/Button/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const useAddChapter = () => {
  const [isShowedAddChapter, setIsShowedAddChapter] = useState<boolean>(false);
  const updateIsShowedAddChapter = () => {
    setIsShowedAddChapter(!isShowedAddChapter);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    title: string;
  }>({
    mode: 'onSubmit',
    resolver: yupResolver(
      yup.object().shape({
        title: yup
          .string()
          .required('チャプター名を入力してください')
          .max(50, '50文字以内で入力してください'),
      })
    ),
  });

  const renderAddChapter = () => {
    return isShowedAddChapter ? (
      <ChapterCard status="private" cardRef={undefined} className="my-3 p-8">
        <div className="flex items-center justify-between">
          <input
            type="text"
            className="w-1/2 rounded-md border border-gray-300 p-2"
            placeholder="チャプター名を入力"
            {...register('title')}
          />
          <div>
            <Button
              size="sm"
              color="danger"
              clickHandler={() => setIsShowedAddChapter(!isShowedAddChapter)}
            >
              キャンセル
            </Button>
            <span className="mx-2" />
            <Button size="md" type="submit">
              保存
            </Button>
          </div>
        </div>
        <div>
          {errors.title && (
            <span className="text-red-600">{errors.title.message}</span>
          )}
        </div>
      </ChapterCard>
    ) : (
      <></>
    );
  };

  return {
    isShowedAddChapter,
    updateIsShowedAddChapter,
    handleSubmit,
    reset,
    renderAddChapter,
  };
};
