import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { ToggleButton } from '@/components/elements/ToggleButton';
import { SideBar } from '@/components/elements/SideBar';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { Breadcrumb } from '@/components/elements/Breadcrumb';
import { Loading } from '@/components/utils/Loading';
import { AuthWrapper } from '@/features/login/components/AuthWrapper';
import { ProgressCard } from '@/features/course/components/ProgressCard';
import { CourseProgressCard } from '@/features/course/components/CourseProgressCard';
import { useFetchCourse } from '@/hooks/useFetchCourse';
import { Error } from '@/components/utils/Error';
import { ChapterCard } from '@/features/chapter/components/ChapterCard';
import { LessonCard } from '@/features/lesson/components/LessonCard';
import { StatusIcon } from '@/features/lesson/components/StatusIcon';

const Index: NextPage = () => {
  const router = useRouter();
  const { attendance_id: attendanceId } = router.query;
  const [isShowedSideBar, setIsShowedSideBar] = useState<boolean>(true);

  const { attendance, isLoading, error } = useFetchCourse({ attendanceId });

  // パン屑のリンクリスト
  const links =
    attendance !== null
      ? [
          {
            title: '講座一覧',
            href: '/courses',
          },
          {
            title: attendance?.course?.title ?? '',
            href: '#',
          },
        ]
      : [];

  return (
    <AuthWrapper>
      <StudentLayout>
        <div className="flex">
          {error && <Error />}
          {isLoading && (
            <div className="w-3/4 mx-auto min-h-[100vh] my-10">
              <Loading />
            </div>
          )}
          {attendance?.course && (
            <>
              {isShowedSideBar ? (
                <SideBar>
                  <ul className="mt-[30px]">
                    <li className="mb-[20px]">
                      <Thumbnail
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL +
                          attendance.course.image
                        }
                        alt="course"
                        height={360}
                        width={640}
                      />
                    </li>
                    <li>
                      <ProgressCard attendance={attendance} />
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
                    src={
                      process.env.NEXT_PUBLIC_IMAGE_URL +
                      attendance.course.image
                    }
                    alt="course"
                    height={360}
                    width={640}
                  />
                  <ProgressCard attendance={attendance} />
                </div>
                <div className="mt-5">
                  <CourseProgressCard
                    attendanceId={attendanceId}
                    courseId={attendance.course.course_id}
                  />
                </div>
                <div className="mt-5">
                  <h2 className="font-semibold text-xl md:text-2xl">
                    コースカリキュラム
                  </h2>
                </div>
                {attendance.course.chapters.map((chapter) => {
                  return (
                    <div key={chapter.chapter_id}>
                      <div className="my-3">
                        <ChapterCard
                          cardRef={undefined}
                          status="public"
                          className="flex items-center justify-center"
                        >
                          <h3 className="font-semibold text-lg md:text-3xl">
                            {chapter.title}
                          </h3>
                        </ChapterCard>
                      </div>
                      <div className="my-5 mx-auto w-11/12 text-center">
                        {chapter.lessons.map((lesson, index) => {
                          return (
                            <div className="my-5" key={lesson.lesson_id}>
                              <Link
                                href={{
                                  pathname: '/chapter',
                                  query: {
                                    attendanceId,
                                    courseId: attendance.course.course_id,
                                    chapterId: chapter.chapter_id,
                                    lessonIndex: index,
                                  },
                                }}
                                as={`/chapter?attendanceId=${attendanceId}&courseId=${attendance.course.course_id}&chapterId=${chapter.chapter_id}`}
                              >
                                <a>
                                  <LessonCard
                                    cardRef={undefined}
                                    status="public"
                                    className="flex items-center flex-start"
                                  >
                                    <span className="mr-3" />
                                    <StatusIcon
                                      status={lesson.lessonAttendance.status}
                                    />
                                    <span className="ml-3" />
                                    <p className="w-11/12 text-xl md:text-2xl">
                                      {lesson.title}
                                    </p>
                                  </LessonCard>
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

export default Index;
