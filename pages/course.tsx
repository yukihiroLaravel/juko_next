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
import { TitleCard as ChapterTitleCard } from '@/features/chapter/components/TitleCard';
import { TitleStatusCard } from '@/features/lesson/components/TitleStatusCard';
import { AuthWrapper } from '@/features/login/components/AuthWrapper';
import { ProgressCard } from '@/features/course/components/ProgressCard';
import { CourseProgressCard } from '@/features/course/components/CourseProgressCard';
import { useFetchCourse } from '@/hooks/useFetchCourse';

const Course: NextPage = () => {
  const router = useRouter();
  const { attendance_id: attendanceId, course_id: courseId } = router.query;
  const [isShowedSideBar, setIsShowedSideBar] = useState<boolean>(true);

  const { attendance, isLoading } = useFetchCourse({ attendanceId });

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
                    courseId={courseId}
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
                        <ChapterTitleCard title={chapter.title} />
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
                                    courseId: courseId,
                                    chapterId: chapter.chapter_id,
                                    lessonIndex: index,
                                  },
                                }}
                                as={`/chapter?attendanceId=${attendanceId}&courseId=${courseId}&chapterId=${chapter.chapter_id}`}
                              >
                                <a>
                                  <TitleStatusCard
                                    status={lesson.lessonAttendance.status}
                                    title={lesson.title}
                                  />
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
