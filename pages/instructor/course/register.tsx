import { InstructorHeader } from '@/components/layouts/InstructorHeader';
import { NextPage } from 'next';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StoreSchema } from '@/features/course/schemas/StoreSchema';
import { StoreCourse } from '@/features/course/types/StoreCourse';
import { Button } from '@/components/elements/Button';
import { useState } from 'react';
import { Axios } from '@/lib/api';
import { FormLayout } from '@/features/course/components/FormLayout';

const Register: NextPage = () => {
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
    <>
      <InstructorHeader />
      <FormLayout>
        <form onSubmit={handleSubmit(submitHandler)}>
          <h2 className="text-center text-2xl py-8">講座登録</h2>
          <div className="w-4/5 mx-auto">
            <div className="my-10">
              <label htmlFor="title">
                <p className="font-bold">講座名</p>
                <input
                  id="title"
                  className="rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
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
                    <span className="text-gray-600 mt-2 mr-3">
                      アップロードされたファイル: {uploadedFileName}
                    </span>
                    <Button
                      type="button"
                      className="p-1"
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
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}
              </label>
            </div>
            <div className="my-5 text-center">
              <Button type="submit" className="w-4/5 py-2 hover:opacity-75">
                登録
              </Button>
            </div>
          </div>
        </form>
      </FormLayout>
    </>
  );
};

export default Register;
