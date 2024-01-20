import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChapterCard } from '../components/ChapterCard';
import { Button } from '@/components/elements/Button';
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
      <ChapterCard status="private" cardRef={undefined} className="my-3 p-8 ">
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="w-1/2 border border-gray-300 rounded-md p-2"
            placeholder="チャプター名を入力"
            {...register('title')}
          />
          <div>
            <Button className="py-2 px-6">保存</Button>
            <span className="mx-2" />
            <Button
              className="p-2"
              color="danger"
              clickHandler={() => setIsShowedAddChapter(!isShowedAddChapter)}
            >
              キャンセル
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
    renderAddChapter,
  };
};
