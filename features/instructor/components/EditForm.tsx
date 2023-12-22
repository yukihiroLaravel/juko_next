import { Button } from '@/components/elements/Button';
import { Axios } from '@/lib/api';
import { useRef, useState } from 'react';
import { useFetchInstructor } from '../hooks/useFetchInstructor';
import { Loading } from '@/components/utils/Loading';
import { PutInstructor } from '../types/PutInstructor';
import { Error } from '@/components/utils/Error';
import FieldInput from '@/components/elements/FieldInput';
import { usePutForm } from '../hooks/usePutForm';
import { ProfileField } from './ProfileField';

export const EditForm: React.FC = () => {
  const isSending = useRef<boolean>(false);
  const { instructor, isLoading, error, mutate } = useFetchInstructor();
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
    instructor,
  });

  const uploadImageHandler = (file: File | null) => {
    uploadImage(file);
    updateUploadedFileName(file?.name ?? null);
  };

  const submitHandler = (data: PutInstructor) => {
    isSending.current = true;

    const formData = new FormData();

    formData.append('nick_name', data.nickName);
    formData.append('last_name', data.lastName);
    formData.append('first_name', data.firstName);
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
        <div className="w-3/4 mx-auto min-h-[100vh] my-10">
          <Loading />
        </div>
      )}
      {error && <Error />}
      {instructor && isDefaultValues && (
        <form
          className="md:w-1/3 md:border mx-auto min-h-full my-10 py-10 bg-white"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h2 className="text-center text-2xl">ユーザー情報編集</h2>
          <div className="w-4/5 mx-auto">
            <div className="mt-10">
              <label htmlFor="nickName">
                <p className="font-bold mb-1">講師名</p>
                <FieldInput
                  defaultValue={instructor.nickName}
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
                <p className="font-bold mb-1">姓</p>
                <FieldInput
                  defaultValue={instructor.lastName}
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
                <p className="font-bold mb-1">名</p>
                <FieldInput
                  defaultValue={instructor.firstName}
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
                <p className="font-bold mb-1">メールアドレス</p>
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
                profileImage={instructor.profileImage}
                uploadImage={uploadImageHandler}
                uploadedFileName={uploadedFileName}
                register={register}
                errors={errors}
              />
              <div className="text-center my-10">
                {isSending.current ? (
                  <Button
                    type="button"
                    className="w-4/5 py-2 text-lg opacity-50 cursor-not-allowed"
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
