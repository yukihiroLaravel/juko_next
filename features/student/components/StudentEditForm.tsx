import { Button } from '@/components/elements/Button';
import { Axios } from '@/lib/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateStoreSchema } from '../schemas/UpdateStoreSchema';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { useDropzone } from 'react-dropzone';
import { FieldInput } from './FieldInput';

export const StudentEditForm: React.FC = () => {
  const isSending = useRef<boolean>(false);

  const [isUniqueEmail, setIsUniqueEmail] = useState<boolean>(false);

  const defaultValues = {
    nickName: '生徒ニックネーム1',
    lastName: '生徒',
    firstName: 'テスト1',
    email: 'test_student_1@example.com',
    occupation: 'システムエンジニア',
    purpose: '自己研鑽のため',
    birthDate: '2023-10-23',
    sex: 'man',
    address: '東京都',
    image: undefined,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(UpdateStoreSchema),
    defaultValues,
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles[0] instanceof File) {
        // setValue('image', acceptedFiles[0]);
        setUploadedFileName(acceptedFiles[0].name);
      }
    },
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
      Axios.post('/api/v1/student/update', bodyData)
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

  const cancelHandler = () => {
    // TODO 画像のキャンセル処理
  };

  return (
    <>
      <form
        className="md:w-1/3 md:border mx-auto min-h-full my-10 py-10 bg-white"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className="text-center text-2xl">ユーザー情報編集</h2>
        <div className="w-4/5 mx-auto">
          <div className="mt-10">
            <label htmlFor="nickName">
              <p>ユーザー名</p>
              <FieldInput name="nickName" control={control} />
              <span className="text-red-600">{errors?.nickName?.message}</span>
            </label>
          </div>
          <div className="my-3">
            <label htmlFor="lastName">
              <p>姓</p>
              <FieldInput name="lastName" control={control} />
              <span className="text-red-600">{errors?.lastName?.message}</span>
            </label>
          </div>
          <div className="my-3">
            <label htmlFor="firstName">
              <p>名</p>
              <FieldInput name="firstName" control={control} />
              <span className="text-red-600">{errors?.firstName?.message}</span>
            </label>
          </div>
          <div className="my-3">
            <label htmlFor="email">
              <p>メールアドレス</p>
              <FieldInput name="email" type="email" control={control} />
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
              <FieldInput name="occupation" control={control} />
              <span className="text-red-600">
                {errors?.occupation?.message}
              </span>
            </label>
          </div>
          <div className="my-3">
            <label htmlFor="purpose">
              <p>目的</p>
              <FieldInput name="purpose" control={control} />
              <span className="text-red-600">{errors?.purpose?.message}</span>
            </label>
          </div>
          <div className="my-3">
            <label htmlFor="birthDate">
              <p>誕生日</p>
              <FieldInput name="birthDate" type="date" control={control} />
              <span className="text-red-600">{errors?.birthDate?.message}</span>
            </label>
          </div>
          <div className="my-3">
            <label htmlFor="sex">
              <p>性別</p>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    {...register('sex', { required: true })}
                    value="man"
                  />
                  <span className="ml-2">男性</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    {...register('sex', { required: true })}
                    value="woman"
                  />
                  <span className="ml-2">女性</span>
                </label>
              </div>
              <span className="text-red-600">{errors?.sex?.message}</span>
            </label>
          </div>
          <div className="my-3">
            <label htmlFor="address">
              <p>住所</p>
              <FieldInput name="address" control={control} />
              <span className="text-red-600">{errors?.address?.message}</span>
            </label>
          </div>
          <div className="my-3">
            <p>プロフィール画像</p>
          </div>
        </div>

        <Thumbnail
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}public/student/student.png`}
          alt="profile image"
          height={360}
          width={640}
        />
        <div className="text-center my-10">
          <Button type="submit" className="w-4/5 py-2 hover:opacity-75 text-lg">
            クリックしてファイルを選択
          </Button>
        </div>
        {uploadedFileName ? (
          <div>
            <span className="text-gray-600 mt-2 mr-3">
              アップロードされたファイル: {uploadedFileName}
            </span>
            <Button
              type="button"
              className="p-2"
              color="danger"
              clickHandler={cancelHandler}
            >
              取り消し
            </Button>
          </div>
        ) : (
          <div
            {...getRootProps({
              className:
                'border-2 border-dotted h-80 flex justify-center items-center',
            })}
          >
            <input {...getInputProps()} {...register('image')} />
            <div className="flex flex-col justify-center items-center ">
              <svg
                aria-hidden="true"
                className="block w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p>画像アップロード</p>
            </div>
          </div>
        )}
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
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
      </form>
    </>
  );
};
