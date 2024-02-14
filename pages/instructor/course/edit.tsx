import { Button } from '@/components/elements/Button';
import { SwitchButton } from '@/components/elements/SwitchButton';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { InstructorHeader } from '@/components/layouts/InstructorHeader';
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
    course,
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

    if (data.title) {
      formData.append('title', data.title);
    }
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }
    if (data.status) {
      formData.append('status', data.status);
    }

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
        console.error(err);
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
          if (
            err.response.data.message ===
            'This course has already been taken by students.'
          ) {
            alert('この講座はすでに受講生がいるため、更新できません。');
            return;
          }
          alert('講座の削除に失敗しました。');
        });
    }
  };

  return (
    <>
      {isLoading && (
        <div className="mx-auto my-10 min-h-[100vh] w-3/4">
          <Loading />
        </div>
      )}
      {course && (
        <>
          <InstructorHeader />
          <FormLayout>
            <form onSubmit={submitHandler}>
              <h2 className="py-8 text-center text-2xl">講座編集</h2>
              <div className="mx-auto w-4/5">
                <div className="mb-5 mt-10">
                  <label htmlFor="title">
                    <p className="font-bold">講座名</p>
                    <input
                      id="title"
                      className="w-full rounded border-b-2 p-2 focus:border-[#B0ABAB] focus:outline-none"
                      defaultValue={course.title}
                      {...register('title')}
                    />
                    {errors.title && (
                      <p className="text-red-500">{errors.title.message}</p>
                    )}
                  </label>
                </div>
                <div className="mb-5">
                  <p className="mb-3 font-bold">非公開/公開</p>
                  <SwitchButton
                    checked={course.status === COURSE_STATUS.PUBLIC}
                    onChange={() => {
                      setValue(
                        'status',
                        course.status === COURSE_STATUS.PUBLIC
                          ? COURSE_STATUS.PRIVATE
                          : COURSE_STATUS.PUBLIC
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
                        <span className="mr-3 mt-2 text-gray-600">
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
                <div className="my-5 flex justify-between text-center">
                  <Button
                    type="button"
                    color="danger"
                    className="px-5 py-2 hover:opacity-75"
                    clickHandler={deleteHandler}
                  >
                    削除
                  </Button>
                  <Button type="submit" className="px-5 py-2 hover:opacity-75">
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
