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
import { TitleCard as ChapterTitleCard } from '@/features/chapter/components/TitleCard';
import Link from 'next/link';
import { TitleStatusCard } from '@/features/lesson/components/TitleStatusCard';
import { Error } from '@/components/utils/Error';
import { Button } from '@/components/elements/Button';

const Index: NextPage = () => {
  const router = useRouter();
  const { course_id: courseId } = router.query;
  const [isShowedSideBar, setIsShowedSideBar] = useState<boolean>(true);

  const { course, isLoading, error } = useFetchInstructorCourse({ courseId });

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
        <div className="flex">
          {error && <Error />}
          {isLoading && (
            <div className="w-3/4 mx-auto min-h-[100vh] my-10">
              <Loading />
            </div>
          )}
          {course && (
            <>
              {isShowedSideBar ? (
                <SideBar>
                  <ul className="mt-[30px]">
                    <li className="mb-[20px]">
                      <Thumbnail
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + course.image}
                        alt="course"
                        height={360}
                        width={640}
                      />
                    </li>
                    <li className="mb-[20px]">
                      <div className="bg-[#89cada] w-full text-center rounded text-gray-700">
                        <p className="font-semibold text-2xl py-5 ">
                          {course.title}
                        </p>
                      </div>
                    </li>
                    <li className="mb-[20px]">
                      <div className="bg-[#89cada] w-full text-center rounded text-gray-700">
                        <p className="font-semibold text-2xl py-5 ">
                          受講生一覧
                        </p>
                      </div>
                    </li>
                    <li className="mb-[20px]">
                      <div className="bg-[#89cada] w-full text-center rounded text-gray-700">
                        <p className="font-semibold text-2xl py-5 ">
                          お知らせ一覧
                        </p>
                      </div>
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
                  <Link href={`/instructor/courses/${course.course_id}/edit`}>
                    <a>
                      {/* TODO アイコン */}
                      <Button className="p-2">チャプター作成</Button>
                    </a>
                  </Link>
                  <Link href={`/instructor/courses/${course.course_id}/edit`}>
                    <a>
                      {/* TODO アイコン */}
                      <Button className="p-2">一括変更</Button>
                    </a>
                  </Link>
                </div>
                {course.chapters.map((chapter) => {
                  return (
                    <div key={chapter.chapter_id}>
                      <div className="my-3">
                        <ChapterTitleCard title={chapter.title} />
                      </div>
                      <div className="my-5 mx-auto w-11/12">
                        {chapter.lessons.map((lesson) => {
                          return (
                            <div className="my-5" key={lesson.lesson_id}>
                              {lesson.title}
                            </div>
                          );
                        })}
                        <Button className="p-2">レッスン作成</Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </InstructorLayout>
    </AuthWrapper>
  );
};

export default Index;
