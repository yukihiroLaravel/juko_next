import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { StudentLayout } from '@/components/organisms/header/StudentLayout';
import { ToggleButton } from '@/components/atoms/Button/ToggleButton';
import { SideBar } from '@/components/atoms/SideBar/SideBar';
import { Thumbnail } from '@/components/atoms/Thumbnail/Thumbnail';
import { Breadcrumb } from '@/components/atoms/Breadcrumb/Breadcrumb';
import { Loading } from '@/components/utils/Loading';
import { StudentAuthWrapper } from '@/features/login/components/Auth/StudentAuthWrapper';
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
            href: '/student/courses',
          },
          {
            title: attendance?.course?.title ?? '',
            href: '#',
          },
        ]
      : [];

  return (
    <StudentAuthWrapper>
      <StudentLayout>
        <div className="flex">
          {error && <Error />}
          {isLoading && (
            <div className="mx-auto my-10 min-h-[100vh] w-3/4">
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
              <div className="mx-auto mb-10 min-h-[100vh] w-3/4">
                <Breadcrumb links={links} />
                <div className="my-5 border-b border-black pb-10 md:hidden">
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
                  <h2 className="text-xl font-semibold md:text-2xl">
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
                          <h3 className="text-lg font-semibold md:text-3xl">
                            {chapter.title}
                          </h3>
                        </ChapterCard>
                      </div>
                      <div className="mx-auto my-5 w-11/12 text-center">
                        {chapter.lessons.map((lesson, index) => {
                          return (
                            <div className="my-5" key={lesson.lesson_id}>
                              <Link
                                href={{
                                  pathname: '/student/chapter',
                                  query: {
                                    attendanceId,
                                    courseId: attendance.course.course_id,
                                    chapterId: chapter.chapter_id,
                                    lessonIndex: index,
                                  },
                                }}
                                as={`/student/chapter?attendanceId=${attendanceId}&courseId=${attendance.course.course_id}&chapterId=${chapter.chapter_id}`}
                              >
                                <a>
                                  <LessonCard
                                    cardRef={undefined}
                                    status="public"
                                    className="flex items-center justify-center"
                                  >
                                    <span className="mr-3" />
                                    <StatusIcon
                                      status={lesson.lessonAttendance.status}
                                    />
                                    <span className="ml-3" />
                                    <p className="w-11/12 px-2 py-5 text-xl md:text-2xl">
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
    </StudentAuthWrapper>
  );
};

export default Index;
