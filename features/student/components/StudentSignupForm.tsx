import { Button } from '@/components/atoms/Button/Button';
import { Axios } from '@/lib/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StoreSchema } from '../schemas/StoreSchema';

export const StudentSignupForm: React.FC = () => {
  const isSending = useRef<boolean>(false);

  const [isUniqueEmail, setIsUniqueEmail] = useState<boolean>(false);

  const defaultValues = {
    nick_name: '',
    last_name: '',
    first_name: '',
    email: '',
    occupation: '',
    purpose: '',
    birth_date: '',
    gender: 'man',
    address: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    nick_name: string;
    last_name: string;
    first_name: string;
    email: string;
    occupation: string;
    purpose: string;
    birth_date: string;
    gender: string;
    address: string;
  }>({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(StoreSchema),
  });

  const submitHandler = (data: typeof defaultValues) => {
    isSending.current = true;

    const bodyData = {
      nick_name: data.nick_name,
      last_name: data.last_name,
      first_name: data.first_name,
      email: data.email,
      occupation: data.occupation,
      purpose: data.purpose,
      birth_date: data.birth_date,
      gender: data.gender,
      address: data.address,
    };
    Axios.get('/sanctum/csrf-cookie').then(() => {
      Axios.post('/api/v1/student', bodyData)
        .then((res) => {
          isSending.current = false;
          if (res.data.result === true) {
            console.log(res.data);
          }
        })
        .catch((error) => {
          isSending.current = false;
          if (error.response.status === 422) {
            setIsUniqueEmail(true);
          }
        });
    });
  };

  return (
    <form
      className="mx-auto my-10 min-h-full bg-white py-10 md:w-1/3 md:border"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="text-center text-2xl">新規登録画面</h2>
      <div className="mx-auto w-4/5">
        <div className="mt-10">
          <label htmlFor="nick_name">
            <p>ユーザー名</p>
            <input
              id="nick_name"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              {...register('nick_name')}
            />
            <span className="text-red-600">{errors?.nick_name?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="last_name">
            <p>姓</p>
            <input
              id="last_name"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              {...register('last_name')}
            />
            <span className="text-red-600">{errors?.last_name?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="first_name">
            <p>名</p>
            <input
              id="first_name"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              {...register('first_name')}
            />
            <span className="text-red-600">{errors?.first_name?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="email">
            <p>メールアドレス</p>
            <input
              id="email"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              {...register('email')}
            />
            <span className="text-red-600">{errors?.email?.message}</span>
            {isUniqueEmail && (
              <span className="text-red-600">
                既に登録されているメールアドレスです
              </span>
            )}
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="occupation">
            <p>職業</p>
            <input
              id="occupation"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              {...register('occupation')}
            />
            <span className="text-red-600">{errors?.occupation?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="purpose">
            <p>目的</p>
            <input
              id="purpose"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              {...register('purpose')}
            />
            <span className="text-red-600">{errors?.purpose?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="birth_date">
            <p>誕生日</p>
            <input
              id="birth_date"
              type="date"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              {...register('birth_date')}
            />
            <span className="text-red-600">{errors?.birth_date?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="gender">
            <p>性別</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('gender', { required: true })}
                  value="man"
                />
                <span className="ml-2">男性</span>
              </label>
              <label className="ml-6 inline-flex items-center">
                <input
                  type="radio"
                  {...register('gender', { required: true })}
                  value="woman"
                />
                <span className="ml-2">女性</span>
              </label>
            </div>
            <span className="text-red-600">{errors?.gender?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="address">
            <p>住所</p>
            <input
              id="address"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              {...register('address')}
            />
            <span className="text-red-600">{errors?.address?.message}</span>
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
