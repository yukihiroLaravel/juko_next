import { Button } from '@/components/atoms/Button/Button';
import { Axios } from '@/lib/api';
import { useRef, useState } from 'react';
import { useFetchInstructor } from '../hooks/useFetchInstructor';
import { Loading } from '@/components/utils/Loading';
import { PutInstructor } from '../types/PutInstructor';
import { Error } from '@/components/utils/Error';
import FieldInput from '@/components/elements/FieldInput';
import { usePutForm } from '../hooks/usePutForm';
import { ProfileField } from '@/components/elements/ProfileField';

export const EditForm: React.FC = () => {
  const isSending = useRef<boolean>(false);
  const { instructor, isLoading, error, mutate } = useFetchInstructor();
  const [isUniqueEmail, setIsUniqueEmail] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const updateUploadedFileName = (fileName: string | null) => {
    setUploadedFileName(fileName);
  };

  const { handleSubmit, register, isDefaultValues, uploadImage, errors } =
    usePutForm({
      instructor,
    });

  const uploadImageHandler = (file: File | null) => {
    uploadImage(file);
    updateUploadedFileName(file?.name ?? null);
  };

  const submitHandler = (data: PutInstructor) => {
    isSending.current = true;

    const formData = new FormData();

    formData.append('nick_name', data.nick_name);
    formData.append('last_name', data.last_name);
    formData.append('first_name', data.first_name);
    formData.append('email', data.email);
    if (data.image) {
      formData.append('profile_image', data.image);
    }

    Axios.get('/sanctum/csrf-cookie').then(() => {
      Axios.post('/api/v1/instructor/update', formData, {
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
      {instructor && isDefaultValues && (
        <form
          className="mx-auto my-10 min-h-full bg-white py-10 md:w-1/3 md:border"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h2 className="text-center text-2xl">ユーザー情報編集</h2>
          <div className="mx-auto w-4/5">
            <div className="mt-10">
              <label htmlFor="nick_name">
                <p className="mb-1 font-bold">講師名</p>
                <FieldInput
                  defaultValue={instructor.nick_name}
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
                  defaultValue={instructor.last_name}
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
                  defaultValue={instructor.first_name}
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
                  defaultValue={instructor.email}
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
              <ProfileField
                profileImage={instructor.profile_image}
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
