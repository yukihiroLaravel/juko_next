import { Button } from '@/components/elements/Button';
import { Axios } from '@/lib/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { StoreSchema } from '../schemas/StoreSchema';

export const StudentSignupForm: React.FC = () => {
  const isSending = useRef<boolean>(false);

  const [isUniqueEmail, setIsUniqueEmail] = useState<boolean>(false);

  const defaultValues = {
    nickName: '',
    lastName: '',
    firstName: '',
    email: '',
    occupation: '',
    purpose: '',
    birthDate: '',
    sex: 'man',
    address: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(StoreSchema),
    defaultValues,
  });

  const submitHandler = (data: typeof defaultValues) => {
    isSending.current = true;

    const bodyData = {
      nick_name: data.nickName,
      last_name: data.lastName,
      first_name: data.firstName,
      email: data.email,
      occupation: data.occupation,
      purpose: data.purpose,
      birth_date: data.birthDate,
      sex: data.sex,
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
    <form className="md:w-1/3 md:border mx-auto min-h-full my-10 bg-white" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="text-center mt-10 text-2xl">新規登録画面</h2>
      <div className="w-4/5 mx-auto">
        <div className="mt-10">
          <label htmlFor="nickName">
            <p>ユーザー名</p>
            <input
              id="nickName"
              className="p-1 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
              {...register('nickName')}
            />
            <span className="text-red-600">{errors?.nickName?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="lastName">
            <p>姓</p>
            <input
              id="lastName"
              className="p-1 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
              {...register('lastName')}
            />
            <span className="text-red-600">{errors?.lastName?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="firstName">
            <p>名</p>
            <input
              id="firstName"
              className="p-1 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
              {...register('firstName')}
            />
            <span className="text-red-600">{errors?.firstName?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="email">
            <p>メールアドレス</p>
            <input
              id="email"
              className="p-1 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
              {...register('email')}
            />
            <span className="text-red-600">{errors?.email?.message}</span>
            {isUniqueEmail && <span className="text-red-600">既に登録されているメールアドレスです</span>}
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="occupation">
            <p>職業</p>
            <input
              id="occupation"
              className="p-1 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
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
              className="p-1 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
              {...register('purpose')}
            />
            <span className="text-red-600">{errors?.purpose?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="birthDate">
            <p>誕生日</p>
            <input
              id="birthDate"
              type="date"
              className="p-1 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
              {...register('birthDate')}
            />
            <span className="text-red-600">{errors?.birthDate?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="sex">
            <p>性別</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" {...register('sex', { required: true })} value="man" />
                <span className="ml-2">男性</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="radio" className="form-radio" {...register('sex', { required: true })} value="woman" />
                <span className="ml-2">女性</span>
              </label>
            </div>
            <span className="text-red-600">{errors?.sex?.message}</span>
          </label>
        </div>
        <div className="my-3">
          <label htmlFor="address">
            <p>住所</p>
            <input
              id="address"
              className="p-1 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
              {...register('address')}
            />
            <span className="text-red-600">{errors?.address?.message}</span>
          </label>
        </div>
        <div className="text-center my-10">
          {isSending.current ? (
            <Button type="button" className="w-4/5 py-2 text-lg" isDisabled={true}>
              登録中...
            </Button>
          ) : (
            <Button type="submit" className="w-4/5 py-2 hover:opacity-75 text-lg">
              登録
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
