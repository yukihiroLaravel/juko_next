import { Breadcrumb } from '@/components/elements/Breadcrumb';
import { SideBar } from '@/components/elements/SideBar';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { ToggleButton } from '@/components/elements/ToggleButton';
import { InstructorLayout } from '@/components/layouts/InstructorLayout';
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
import { ChapterCard } from '@/features/chapter/components/ChapterCard';

const Index: NextPage = () => {
  const router = useRouter();
  const { course_id: courseId } = router.query;
  const [isShowedSideBar, setIsShowedSideBar] = useState<boolean>(true);
  const [isShowedAddChapter, setIsShowedAddChapter] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

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
        .then((res) => {
          if (res.data.result === true) {
            mutate();
          }
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    });
  };

  const handleAddChapter = async () => {
    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.post(`/api/v1/instructor/course/${courseId}/chapter`, {
        title,
      })
        .then((res) => {
          if (res.data.result === true) {
            mutate();
          }
        })
        .catch((error) => {
          console.log(error.response.data.errors);
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
    <AuthWrapper>
      <InstructorLayout>
        {error && <Error />}
        {isLoading && (
          <div className="w-3/4 mx-auto min-h-[100vh] my-10">
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
                      <div className="bg-[#89cada] w-full text-center rounded text-gray-700">
                        <p className="font-semibold text-2xl py-5 ">
                          {course.title}
                        </p>
                      </div>
                    </li>
                    <li className="mb-5">
                      <Link href="#">
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
              <div className="w-3/4 mx-auto min-h-[100vh] mb-10">
                <Breadcrumb links={links} />
                <div className="pb-10 border-black border-b my-5 md:hidden">
                  <Thumbnail
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + course.image}
                    alt="course"
                    height={360}
                    width={640}
                  />
                </div>
                <div className="mt-5 flex justify-between">
                  <Button
                    className="p-2 flex items-center"
                    clickHandler={() =>
                      setIsShowedAddChapter(!isShowedAddChapter)
                    }
                  >
                    <CirclePlusIcon strokeWidth={1} />
                    チャプター作成
                  </Button>
                  <PutStatusDropDown
                    courseId={course.course_id}
                    mutate={mutate}
                  />
                </div>
                {isShowedAddChapter && (
                  <ChapterCard
                    status="private"
                    cardRef={undefined}
                    className="my-3"
                  >
                    <div className="shadow-md rounded-md p-8 flex justify-between items-center">
                      <input
                        type="text"
                        className="w-1/2 border border-gray-300 rounded-md p-2"
                        placeholder="チャプター名を入力"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <div>
                        <Button
                          className="py-2 px-6"
                          clickHandler={() => {
                            handleAddChapter();
                            setIsShowedAddChapter(!isShowedAddChapter);
                          }}
                        >
                          保存
                        </Button>
                        <span className="mx-2" />
                        <Button
                          className="p-2"
                          color="danger"
                          clickHandler={() =>
                            setIsShowedAddChapter(!isShowedAddChapter)
                          }
                        >
                          キャンセル
                        </Button>
                      </div>
                    </div>
                  </ChapterCard>
                )}
                <DndProvider backend={HTML5Backend}>
                  {course.chapters.map((chapter, index) => {
                    return (
                      <ChapterWithLessonsBlock
                        key={chapter.chapter_id}
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
    </AuthWrapper>
  );
};

export default Index;
