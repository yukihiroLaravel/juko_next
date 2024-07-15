import { Button } from '@/components/atoms/Button/Button';
import { Axios } from '@/lib/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { StoreSchema } from '../schemas/StoreSchema';
import { NOTIFICATION_TYPE } from '@/features/notification/types/Notification';
import Router from 'next/router';
import { FieldDateInput } from '@/components/atoms/Field/FieldDateInput';
import { format } from 'date-fns';
import { StoreNotification } from '@/features/notification/types/StoreNotification';
import { CourseSelectBox } from '@/features/course/components/CourseSelectBox';

export const NotificationRegisterForm: React.FC = () => {
  const defaultValues = {
    course_id: '',
    title: '',
    type: NOTIFICATION_TYPE.TYPE_ONCE as string,
    start_date: '',
    end_date: '',
    content: '',
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<{
    course_id: string;
    title: string;
    type: string;
    start_date: string;
    end_date: string;
    content: string;
  }>({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(StoreSchema),
  });

  const submitHandler = (data: StoreNotification) => {
    const bodyData = {
      course_id: data.course_id,
      title: data.title,
      type: data.type,
      start_date: formatDateTime(data.start_date),
      end_date: formatDateTime(data.end_date),
      content: data.content,
    };
    Axios.get('/sanctum/csrf-cookie').then(() => {
      Axios.post(
        `/api/v1/instructor/course/${data.course_id}/notification`,
        bodyData,
      )
        .then((res) => {
          if (res.data.result === true) {
            Router.push('/instructor/notifications');
          }
          alert('登録しました');
        })
        .catch((error) => {
          alert('登録に失敗しました');
        });
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  };

  return (
    <form
      className="mx-auto my-10 flex min-h-full flex-col items-center bg-white py-10 md:w-1/3 md:border  "
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="text-center text-2xl">お知らせ登録</h2>
      <div className="flex w-4/5 flex-col items-center gap-y-4">
        <div className="mt-10 w-full space-y-2">
          <label htmlFor="course_name" className="font-bold">
            講座名
          </label>
          <CourseSelectBox id="course_name" register={register('course_id')} />
          <span className="text-red-600">{errors?.course_id?.message}</span>
        </div>
        <div className="w-full">
          <label htmlFor="title" className="font-bold">
            タイトル
          </label>
          <input
            id="title"
            className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
            {...register('title')}
          />
          <span className="text-red-600">{errors?.title?.message}</span>
        </div>
        <div className="w-full space-y-2">
          <p className="font-bold">表示タイプ</p>
          <div className="flex">
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register('type')}
                value={NOTIFICATION_TYPE.TYPE_ALWAYS}
              />
              <span className="ml-2">常に表示</span>
            </label>
            <label className="ml-6 inline-flex items-center">
              <input
                type="radio"
                {...register('type')}
                value={NOTIFICATION_TYPE.TYPE_ONCE}
              />
              <span className="ml-2">１度だけ表示</span>
            </label>
          </div>
          <span className="text-red-600">{errors?.type?.message}</span>
        </div>
        <div className="flex w-full flex-col">
          <label className="font-bold">開始日時</label>
          <FieldDateInput
            control={control}
            placeholderText=" 年 / 月 / 日"
            {...register('start_date')}
          />
        </div>
        <div className="flex w-full flex-col">
          <label className="font-bold">終了日時</label>
          <FieldDateInput
            control={control}
            placeholderText=" 年 / 月 / 日"
            {...register('end_date')}
          />
        </div>
        <div className="w-full">
          <label htmlFor="content" className="font-bold">
            お知らせ内容
          </label>
          <textarea
            id="content"
            className="h-48 w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
            {...register('content')}
          />
          <span className="text-red-600">{errors?.content?.message}</span>
        </div>
        <div className="my-10 text-center">
          {isSubmitting ? (
            <Button type="button" size="lg" isDisabled={true}>
              登録中...
            </Button>
          ) : (
            <Button type="submit" size="lg">
              登録
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
