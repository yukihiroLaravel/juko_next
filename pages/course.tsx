import { ToggleButton } from '@/components/elements/ToggleButton';
import { SideBar } from '@/components/elements/SideBar';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { TitleCard as ChapterTitleCard } from '@/features/chapter/components/TitleCard';
import { TitleStatusCard } from '@/features/lesson/components/TitleStatusCard';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { Breadcrumb } from '@/components/elements/Breadcrumb';
import { useFetchCourse } from '@/hooks/useFetchCourse';
import { Loading } from '@/components/utils/Loading';
import { AuthWrapper } from '@/features/login/components/AuthWrapper';
import { useRouter } from 'next/router';
import { ProgressCard } from '@/features/course/components/ProgressCard';
import { StudentLayout } from '@/components/layouts/StudentLayout';

const Course: NextPage = () => {
  const router = useRouter();
  const { attendance_id: attendanceId } = router.query;
  const [isShowedSideBar, setIsShowedSideBar] = useState<boolean>(true);

  const { course, isLoading, error } = useFetchCourse({ attendanceId });

  // パン屑のリンクリスト
  const links =
    course !== null
      ? [
          {
            title: '講座一覧',
            href: '/courses',
          },
          {
            title: course?.title ?? '',
            href: '#',
          },
        ]
      : [];

  return (
    <AuthWrapper>
      <StudentLayout>
        <div className="flex">
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
                    <li>
                      <ProgressCard course={course} />
                    </li>
                  </ul>
                  <ToggleButton isShowedSideBar={isShowedSideBar} setIsShowedSideBar={setIsShowedSideBar} />
                </SideBar>
              ) : (
                <ToggleButton isShowedSideBar={isShowedSideBar} setIsShowedSideBar={setIsShowedSideBar} />
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
                  <ProgressCard course={course} />
                </div>
                <div className="mt-5">
                  <h2 className="font-semibold text-xl md:text-2xl">コースカリキュラム</h2>
                </div>
                {course.chapters.map((chapter) => {
                  return (
                    <div key={chapter.chapter_id}>
                      <div className="my-3">
                        <ChapterTitleCard title={chapter.title} />
                      </div>
                      <div className="my-5 mx-auto w-11/12 text-center">
                        {chapter.lessons.map((lesson, index) => {
                          return (
                            <div className="my-5" key={lesson.lesson_id}>
                              <Link
                                href={{
                                  pathname: '/chapter',
                                  query: { attendanceId, chapterId: chapter.chapter_id, lessonIndex: index },
                                }}
                                as={`/chapter?attendanceId=${attendanceId}&chapterId=${chapter.chapter_id}`}
                              >
                                <a>
                                  <TitleStatusCard status={lesson.lessonAttendance.status} title={lesson.title} />
                                </a>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </StudentLayout>
    </AuthWrapper>
  );
};

export default Course;
