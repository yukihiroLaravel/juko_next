import { NextPage } from 'next';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StoreSchema } from '@/features/course/schemas/StoreSchema';
import { StoreCourse } from '@/features/course/types/StoreCourse';
import { Button } from '@/components/atoms/Button/Button';
import { useState } from 'react';
import { Axios } from '@/lib/api';
import { FormLayout } from '@/features/course/components/FormLayout';
import { InstructorLayout } from '@/components/organisms/header';
import { InstructorAuthWrapper } from '@/features/login/components/Auth/InstructorAuthWrapper';

const Index: NextPage = () => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StoreCourse>({
    mode: 'onSubmit',
    resolver: yupResolver(StoreSchema),
    defaultValues: {
      title: '',
      image: undefined,
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles[0] instanceof File) {
        setValue('image', acceptedFiles[0]);
        setUploadedFileName(acceptedFiles[0].name);
      }
    },
  });

  const submitHandler = (data: StoreCourse) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('image', data.image as File);

    Axios.post('api/v1/instructor/course', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        alert('講座を登録しました');
      })
      .catch((err) => {
        console.log(err);
        alert('講座の登録に失敗しました');
      });
  };

  return (
    <InstructorAuthWrapper>
      <InstructorLayout>
        <FormLayout>
          <form onSubmit={handleSubmit(submitHandler)}>
            <h2 className="py-8 text-center text-2xl">講座登録</h2>
            <div className="mx-auto w-4/5">
              <div className="my-10">
                <label htmlFor="title">
                  <p className="font-bold">講座名</p>
                  <input
                    id="title"
                    className="w-full rounded border-b-2 focus:border-[#B0ABAB] focus:outline-none"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </label>
              </div>
              <div className="my-10">
                <label htmlFor="image">
                  <p className="font-bold">講座画像</p>
                  {uploadedFileName ? (
                    <>
                      <span className="mr-3 mt-2 text-gray-600">
                        アップロードされたファイル: {uploadedFileName}
                      </span>
                      <Button
                        type="button"
                        size="sm"
                        color="danger"
                        clickHandler={() => {
                          setValue('image', undefined);
                          setUploadedFileName(null);
                        }}
                      >
                        取り消し
                      </Button>
                    </>
                  ) : (
                    <div
                      {...getRootProps({
                        className:
                          'border-2 border-dotted h-80 flex justify-center items-center',
                      })}
                    >
                      <input {...getInputProps()} {...register('image')} />
                      <div className="flex flex-col items-center justify-center ">
                        <svg
                          aria-hidden="true"
                          className="block size-8 text-gray-400"
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
                  {errors.image && (
                    <p className="text-red-500">{errors.image.message}</p>
                  )}
                </label>
              </div>
              <div className="my-5 text-center">
                <Button type="submit" size="lg">
                  登録
                </Button>
              </div>
            </div>
          </form>
        </FormLayout>
      </InstructorLayout>
    </InstructorAuthWrapper>
  );
};

export default Index;
