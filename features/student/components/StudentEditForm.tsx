import { useRef, useState } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Loading } from '@/components/utils/Loading';
import { FieldDateInput } from '@/components/atoms/Field/FieldDateInput';
import FieldInput from '@/components/atoms/Field/FieldInput';
import { Error } from '@/components/utils/Error';
import { GenderRadioField } from './GenderRadioField';
import { ProfileField } from '@/features/user/components/ProfileField';
import { useFetchStudent } from '../hooks/useFetchStudent';
import { usePutForm } from '../hooks/usePutForm';
import { PutStudent } from '../types/PutStudent';
import { Axios } from '@/lib/api';
import { format } from 'date-fns';

export const StudentEditForm: React.FC = () => {
  const isSending = useRef<boolean>(false);
  const { student, isLoading, error, mutate } = useFetchStudent();
  const [isUniqueEmail, setIsUniqueEmail] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const updateUploadedFileName = (fileName: string | null) => {
    setUploadedFileName(fileName);
  };

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

  const uploadImageHandler = (file: File | null) => {
    uploadImage(file);
    updateUploadedFileName(file?.name ?? null);
  };

  const submitHandler = (data: PutStudent) => {
    isSending.current = true;

    const formData = new FormData();

    const birthDate = format(new Date(data.birth_date), 'yyyy-MM-dd');
    formData.append('nick_name', data.nick_name);
    formData.append('last_name', data.last_name);
    formData.append('first_name', data.first_name);
    formData.append('email', data.email);
    formData.append('occupation', data.occupation);
    formData.append('purpose', data.purpose);
    formData.append('address', data.address);
    formData.append('birth_date', birthDate);
    formData.append('sex', data.sex);
    if (data.image) {
      formData.append('profile_image', data.image);
    }

    Axios.get('/sanctum/csrf-cookie').then(() => {
      Axios.post('/api/v1/student/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          isSending.current = false;
          updateUploadedFileName(null);
          alert('更新しました');
          mutate();
        })
        .catch((error) => {
          isSending.current = false;
          alert('更新に失敗しました');
          if (error.response.status === 422) {
            setIsUniqueEmail(true);
          }
        });
    });
  };

  return (
    <>
      {isLoading && (
        <div className="mx-auto my-10 min-h-[100vh] w-3/4">
          <Loading />
        </div>
      )}
      {error && <Error />}
      {student && isDefaultValues && (
        <form
          className="mx-auto my-10 min-h-full bg-white py-10 md:w-1/3 md:border"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h2 className="text-center text-2xl">ユーザー情報編集</h2>
          <div className="mx-auto w-4/5">
            <div className="mt-10">
              <label htmlFor="nick_name">
                <p className="mb-1 font-bold">ユーザー名</p>
                <FieldInput
                  defaultValue={student.nick_name}
                  {...register('nick_name')}
                />
                {errors.nick_name && (
                  <span className="text-red-600">
                    {errors.nick_name.message}
                  </span>
                )}
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="last_name">
                <p className="mb-1 font-bold">姓</p>
                <FieldInput
                  defaultValue={student.last_name}
                  {...register('last_name')}
                />
                {errors.last_name && (
                  <span className="text-red-600">
                    {errors.last_name.message}
                  </span>
                )}
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="first_name">
                <p className="mb-1 font-bold">名</p>
                <FieldInput
                  defaultValue={student.first_name}
                  {...register('first_name')}
                />
                {errors.first_name && (
                  <span className="text-red-600">
                    {errors.first_name.message}
                  </span>
                )}
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="email">
                <p className="mb-1 font-bold">メールアドレス</p>
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
                <p className="mb-1 font-bold">職業</p>
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
                <p className="mb-1 font-bold">目的</p>
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
                <p className="mb-1 font-bold">誕生日</p>
                <FieldDateInput name="birth_date" control={control} />
                {errors.birth_date && (
                  <span className="text-red-600">
                    {errors.birth_date.message}
                  </span>
                )}
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="sex">
                <p className="mb-1 font-bold">性別</p>
                <div className="mt-2">
                  <GenderRadioField name="sex" control={control} />
                </div>
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="address">
                <p className="mb-1 font-bold">住所</p>
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
                profileImage={student.profile_image}
                uploadImage={uploadImageHandler}
                uploadedFileName={uploadedFileName}
                register={register('image')}
                error={errors.image?.message}
              />
              <div className="my-10 text-center">
                {isSending.current ? (
                  <Button type="button" size="lg" isDisabled={true}>
                    更新中...
                  </Button>
                ) : (
                  <Button type="submit" size="lg">
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
