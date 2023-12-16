import { Button } from '@/components/elements/Button';
import { Axios } from '@/lib/api';
import { useRef, useState } from 'react';
import { useFetchStudent } from '../hooks/useFetchStudent';
import { usePutForm } from '../hooks/usePutForm';
import { Loading } from '@/components/utils/Loading';
import { GenderRadioField } from './GenderRadioField';
import { FieldDateInput } from './FieldDateInput';
import { ProfileField } from './ProfileField';
import { PutStudent } from '../types/PutStudent';
import { format } from 'date-fns';
import FieldInput from './FieldInput';

export const StudentEditForm: React.FC = () => {
  const isSending = useRef<boolean>(false);
  const { student, isLoading, mutate } = useFetchStudent();
  const [isUniqueEmail, setIsUniqueEmail] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    control,
    isDefaultValues,
    uploadImage,
    errors,
  } = usePutForm({
    student,
  });

  const submitHandler = (data: PutStudent) => {
    isSending.current = true;

    const birthDate = format(new Date(data.birthDate), 'yyyy-MM-dd');
    const bodyData = {
      nick_name: data.nickName,
      last_name: data.lastName,
      first_name: data.firstName,
      email: data.email,
      occupation: data.occupation,
      purpose: data.purpose,
      birth_date: birthDate,
      sex: data.sex,
      address: data.address,
    };
    Axios.get('/sanctum/csrf-cookie').then(() => {
      Axios.post('/api/v1/student/update', bodyData)
        .then(() => {
          isSending.current = false;
          mutate();
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
    <>
      {isLoading && (
        <div className="w-3/4 mx-auto min-h-[100vh] my-10">
          <Loading />
        </div>
      )}
      {student && isDefaultValues && (
        <form
          className="md:w-1/3 md:border mx-auto min-h-full my-10 py-10 bg-white"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h2 className="text-center text-2xl">ユーザー情報編集</h2>
          <div className="w-4/5 mx-auto">
            <div className="mt-10">
              <label htmlFor="nickName">
                <p>ユーザー名</p>
                <FieldInput
                  defaultValue={student.nickName}
                  {...register('nickName')}
                />
                {errors.nickName && (
                  <span className="text-red-600">
                    {errors.nickName.message}
                  </span>
                )}
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="lastName">
                <p>姓</p>
                <FieldInput
                  defaultValue={student.lastName}
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <span className="text-red-600">
                    {errors.lastName.message}
                  </span>
                )}
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="firstName">
                <p>名</p>
                <FieldInput
                  defaultValue={student.firstName}
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <span className="text-red-600">
                    {errors.firstName.message}
                  </span>
                )}
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="email">
                <p>メールアドレス</p>
                <FieldInput
                  defaultValue={student.email}
                  type="email"
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
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
                <FieldInput
                  defaultValue={student.occupation}
                  {...register('occupation')}
                />
                {errors.occupation && (
                  <span className="text-red-600">
                    {errors.occupation.message}
                  </span>
                )}
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="purpose">
                <p>目的</p>
                <FieldInput
                  defaultValue={student.purpose}
                  {...register('purpose')}
                />
                {errors.purpose && (
                  <span className="text-red-600">{errors.purpose.message}</span>
                )}
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="birthDate">
                <p>誕生日</p>
                <FieldDateInput name="birthDate" control={control} />
                {errors.birthDate && (
                  <span className="text-red-600">
                    {errors.birthDate.message}
                  </span>
                )}
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="sex">
                <p>性別</p>
                <div className="mt-2">
                  <GenderRadioField name="sex" control={control} />
                </div>
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="address">
                <p>住所</p>
                <FieldInput
                  defaultValue={student.address}
                  {...register('address')}
                />
                {errors.address && (
                  <span className="text-red-600">{errors.address.message}</span>
                )}
              </label>
            </div>
            <div className="my-3">
              <ProfileField
                name="image"
                control={control}
                uploadImage={uploadImage}
                profileImage={student.profileImage}
              />
              <div className="text-center my-10">
                {isSending.current ? (
                  <Button
                    type="button"
                    className="w-4/5 py-2 text-lg"
                    isDisabled={true}
                  >
                    更新中...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-4/5 py-2 hover:opacity-75 text-lg"
                  >
                    更新
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
