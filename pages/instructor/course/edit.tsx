import { Button } from '@/components/elements/Button';
import { SwitchButton } from '@/components/elements/SwitchButton';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { Header } from '@/components/layouts/Header';
import { Loading } from '@/components/utils/Loading';
import { FormLayout } from '@/features/course/components/FormLayout';
import { useFetchInstructorCourse } from '@/features/course/hooks/useFetchInstructorCourse';
import { useUpdateCourse } from '@/features/course/hooks/useUpdateCourse';
import { COURSE_STATUS } from '@/features/course/types/Course';
import { Axios } from '@/lib/api';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Edit: NextPage = () => {
  const router = useRouter();
  const { course_id } = router.query;

  const { course, isLoading, mutate } = useFetchInstructorCourse({
    courseId: course_id,
  });

  const { register, setValue, errors, handleSubmit } = useUpdateCourse({
    course: course,
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles[0] instanceof File) {
        setValue('image', acceptedFiles[0]);
        setUploadedFileName(acceptedFiles[0].name);
      }
    },
  });

  const submitHandler = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }
    formData.append('status', data.status);

    await Axios.post(`api/v1/instructor/course/${course_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        mutate();
        setValue('image', undefined);
        setUploadedFileName(null);
        alert('講座を更新しました。');
      })
      .catch((err) => {
        console.log(err);
        alert('講座の更新に失敗しました。');
      });
  });

  // 画像アップロードのキャンセル処理
  const cancelHandler = () => {
    setValue('image', undefined);
    setUploadedFileName(null);
  };

  // 講座削除処理
  const deleteHandler = () => {
    if (confirm('講座を削除しますか？')) {
      Axios.delete(`api/v1/instructor/course/${course_id}`)
        .then((res) => {
          alert('講座を削除しました。');
          router.push('/instructor/courses');
        })
        .catch((err) => {
          console.log(err);
          alert('講座の削除に失敗しました。');
        });
    }
  };

  return (
    <>
      {isLoading && (
        <div className="w-3/4 mx-auto min-h-[100vh] my-10">
          <Loading />
        </div>
      )}
      {course && (
        <>
          <Header />
          <FormLayout>
            <form onSubmit={submitHandler}>
              <h2 className="text-center text-2xl py-8">講座編集</h2>
              <div className="w-4/5 mx-auto">
                <div className="mt-10 mb-5">
                  <label htmlFor="title">
                    <p className="font-bold">講座名</p>
                    <input
                      id="title"
                      className="p-2 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
                      defaultValue={course.title}
                      {...register('title')}
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                  </label>
                </div>
                <div className="mb-5">
                  <p className="font-bold mb-3">非公開/公開</p>
                  <SwitchButton
                    checked={course.status === COURSE_STATUS.PUBLIC}
                    onChange={() => {
                      setValue(
                        'status',
                        course.status === COURSE_STATUS.PUBLIC ? COURSE_STATUS.PRIVATE : COURSE_STATUS.PUBLIC
                      );
                    }}
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="image">
                    <p className="font-bold">講座画像</p>
                    <Thumbnail
                      src={process.env.NEXT_PUBLIC_IMAGE_URL + course.image}
                      alt="course image"
                      height={360}
                      width={640}
                    />
                    {uploadedFileName ? (
                      <div>
                        <span className="text-gray-600 mt-2 mr-3">アップロードされたファイル: {uploadedFileName}</span>
                        <Button type="button" className="p-2" color="danger" clickHandler={cancelHandler}>
                          取り消し
                        </Button>
                      </div>
                    ) : (
                      <div
                        {...getRootProps({
                          className: 'border-2 border-dotted h-80 flex justify-center items-center',
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
                  </label>
                </div>
                <div className="my-5 text-center flex justify-between">
                  <Button
                    type="button"
                    color="danger"
                    className="hover:opacity-75 py-2 px-5"
                    clickHandler={deleteHandler}
                  >
                    削除
                  </Button>
                  <Button type="submit" className="hover:opacity-75 py-2 px-5">
                    更新
                  </Button>
                </div>
              </div>
            </form>
          </FormLayout>
        </>
      )}
    </>
  );
};

export default Edit;
