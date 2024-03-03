import { Breadcrumb } from '@/components/elements/Breadcrumb';
import { SideBar } from '@/components/elements/SideBar';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { ToggleButton } from '@/components/elements/ToggleButton';
import { InstructorLayout } from '@/components/organisms/header/InstructorLayout';
import { Loading } from '@/components/utils/Loading';
import { useFetchInstructorCourse } from '@/features/course/hooks/useFetchInstructorCourse';
import { AuthWrapper } from '@/features/login/components/AuthWrapper';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { Error } from '@/components/utils/Error';
import { Button } from '@/components/elements/Button';
import { ChapterWithLessonsBlock } from '@/features/chapter/components/ChapterWithLessonsBlock';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Chapter } from '@/features/chapter/types/Chapter';
import { Lesson } from '@/features/lesson/types/Lesson';
import { Axios } from '@/lib/api';
import { PutStatusDropDown } from '@/features/chapter/components/PutStatusDropDown';
import { CirclePlusIcon } from '@/components/icons/CirclePlusIcon';
import { useAddChapter } from '@/features/chapter/hooks/useAddChapter';
import { InstructorAuthWrapper } from '@/features/login/components/InstructorAuthWrapper';

const Index: NextPage = () => {
  const router = useRouter();
  const { course_id: courseId } = router.query;
  const [isShowedSideBar, setIsShowedSideBar] = useState<boolean>(true);
  const { updateIsShowedAddChapter, handleSubmit, renderAddChapter, reset } =
    useAddChapter();

  const { course, isLoading, error, mutate } = useFetchInstructorCourse({
    courseId,
  });

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    if (course === undefined) return;
    if (course.chapters === undefined) return;
    // チャプターを並び変えてAPIへ送信
    // dragIndexとhoverIndexの要素だけを入れ替える
    const newChapters = [...course.chapters];
    const dragCard = newChapters[dragIndex] as Chapter & {
      lessons: Lesson[];
    };
    newChapters.splice(dragIndex, 1);
    newChapters.splice(hoverIndex, 0, dragCard);

    // {chapter_id: 1, order: 1}, {chapter_id: 2, order: 2}のような形にする
    const body = newChapters.map((chapter, index) => {
      return {
        chapter_id: chapter.chapter_id,
        order: index + 1,
      };
    });

    // APIへ送信
    Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.post(`/api/v1/instructor/course/${courseId}/chapter/sort`, {
        chapters: body,
      })
        .then(() => {
          console.log('並び替え成功');
          mutate();
        })
        .catch((error) => {
          console.error(error);
          alert('チャプターの並び替えに失敗しました');
        });
    });
  };

  const handleAddChapter = async (data: { title: string }) => {
    return await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.post(`/api/v1/instructor/course/${courseId}/chapter`, {
        title: data.title,
      })
        .then(() => {
          reset();
          updateIsShowedAddChapter();
          mutate();
        })
        .catch((error) => {
          console.error(error);
          alert('チャプターの作成に失敗しました');
        });
    });
  };

  // パン屑のリンクリスト
  const links =
    course !== null
      ? [
          {
            title: '講座一覧',
            href: '/instructor/courses',
          },
          {
            title: course?.title ?? '',
            href: '#',
          },
        ]
      : [];

  return (
    <InstructorAuthWrapper>
      <InstructorLayout>
        {error && <Error />}
        {isLoading && (
          <div className="mx-auto my-10 min-h-[100vh] w-3/4">
            <Loading />
          </div>
        )}
        <div className="flex">
          {course && (
            <>
              {isShowedSideBar ? (
                <SideBar>
                  <ul className="mt-5">
                    <li className="mb-5">
                      <Thumbnail
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + course.image}
                        alt="course"
                        height={360}
                        width={640}
                      />
                    </li>
                    <li className="mb-5">
                      <div className="w-full rounded bg-[#89cada] text-center text-gray-700">
                        <p className="py-5 text-2xl font-semibold ">
                          {course.title}
                        </p>
                      </div>
                    </li>
                    <li className="mb-5">
                      <Link
                        href={`/instructor/course/students/?course_id=${course.course_id}`}
                      >
                        <a className="underline">受講生一覧</a>
                      </Link>
                    </li>
                    <li className="mb-5">
                      <Link href="#">
                        <a className="underline">お知らせ一覧</a>
                      </Link>
                    </li>
                  </ul>
                  <ToggleButton
                    isShowedSideBar={isShowedSideBar}
                    setIsShowedSideBar={setIsShowedSideBar}
                  />
                </SideBar>
              ) : (
                <ToggleButton
                  isShowedSideBar={isShowedSideBar}
                  setIsShowedSideBar={setIsShowedSideBar}
                />
              )}
              <div className="mx-auto mb-10 min-h-[100vh] w-3/4">
                <Breadcrumb links={links} />
                <div className="my-5 border-b border-black pb-10 md:hidden">
                  <Thumbnail
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + course.image}
                    alt="course"
                    height={360}
                    width={640}
                  />
                </div>
                <div className="mt-5 flex justify-between">
                  <Button
                    className="flex items-center p-2"
                    clickHandler={updateIsShowedAddChapter}
                  >
                    <CirclePlusIcon strokeWidth={1} />
                    チャプター作成
                  </Button>
                  <PutStatusDropDown
                    courseId={course.course_id}
                    mutate={mutate}
                  />
                </div>
                <form onSubmit={handleSubmit(handleAddChapter)}>
                  {renderAddChapter()}
                </form>
                <DndProvider backend={HTML5Backend}>
                  {course.chapters.map((chapter, index) => {
                    return (
                      <ChapterWithLessonsBlock
                        key={crypto.randomUUID()}
                        chapterIndex={index}
                        courseId={course.course_id}
                        chapter={chapter}
                        mutate={mutate}
                        moveCard={moveCard}
                      />
                    );
                  })}
                </DndProvider>
              </div>
            </>
          )}
        </div>
      </InstructorLayout>
    </InstructorAuthWrapper>
  );
};

export default Index;
