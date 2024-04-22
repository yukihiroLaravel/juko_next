import { Button } from '@/components/atoms/Button/Button';
import { Axios } from '@/lib/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StoreSchema } from '../schemas/StoreSchema';
import Router from 'next/router';
import { useFetchInstructorCourses } from '@/features/course/hooks/useFetchInstructorCourses';

export const NotificationRegisterForm: React.FC = () => {
  const isSending = useRef<boolean>(false);
  const { courses } = useFetchInstructorCourses();

  const defaultValues = {
    course_id: -1,
    title: '',
    type: 'once',
    start_date: '',
    end_date: '',
    content: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    course_id: number;
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

  const submitHandler = (data: typeof defaultValues) => {
    isSending.current = true;

    const bodyData = {
      course_id: data.course_id,
      title: data.title,
      type: data.type,
      start_date: data.start_date,
      end_date: data.end_date,
      content: data.content,
    };

    Axios.get('/sanctum/csrf-cookie').then(() => {
      Axios.post(`/api/v1/instructor/course/${data.course_id}/notification`, bodyData,)
        .then((res) => {
          isSending.current = false;
          if (res.data.result === true) {
            Router.push('/instructor/notifications');
          }
          alert('登録しました');
        })
        .catch((error) => {
          isSending.current = false;
          alert('登録に失敗しました');
        });
    });
  };

  return (
    <form
      className="mx-auto my-10 min-h-full bg-white py-10 md:w-1/3 md:border"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="text-center text-2xl">お知らせ登録</h2>
      <div className="mx-auto w-4/5">
        <div className="mt-10">
          <label htmlFor="courseName">
            <p className="mb-1 font-bold">講座名</p>
          </label>
          <select id="courseName" className="block mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          {...register('course_id')}
          >
            {courses?.map((course, index) => (
              <option key={index} value={course.course_id}>
                {course.title}
              </option>
            ))}
          </select>
          <span className="text-red-600">{errors?.course_id?.message}</span>
        </div>
        <div className="my-3">
          <label htmlFor="title">
            <p className="mb-1 font-bold">タイトル</p>
            <input
              id="title"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              {...register('title')}
            />
            
          </label>
          <span className="text-red-600">{errors?.title?.message}</span>
        </div>
        <div className="my-3">
          <label htmlFor="type">
            <p className="mb-1 font-bold">表示タイプ</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('type', { required: true })}
                  value="once"
                />
                <span className="ml-2">常に表示</span>
              </label>
              <label className="ml-6 inline-flex items-center">
                <input
                  type="radio"
                  {...register('type', { required: true })}
                  value="always"
                />
                <span className="ml-2">１度だけ表示</span>
              </label>
            </div>
            <span className="text-red-600">{errors?.type?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="start_date">
            <p className="mb-1 font-bold">開始日時</p>
            <input
              id="start_date"
              type="date"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              {...register('start_date')}
            />
            <span className="text-red-600">{errors?.start_date?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="end_date">
            <p className="mb-1 font-bold">終了日時</p>
            <input
              id="end_date"
              type="date"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              {...register('end_date')}
            />
            <span className="text-red-600">{errors?.end_date?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="content">
            <p className="mb-1 font-bold">お知らせ内容</p>
            <textarea
              id="content"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none h-48"
              {...register('content')}
            />
            <span className="text-red-600">{errors?.content?.message}</span>
          </label>
        </div>
        <div className="my-10 text-center">
          {isSending.current ? (
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
