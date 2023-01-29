import Header from '@/components/layouts/Header';
import { ToggleButton } from '@/components/elements/ToggleButton';
import { ProgressBar } from '@/components/elements/ProgressBar';
import { SideBar } from '@/components/elements/SideBar';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { TitleCard as ChapterTitleCard } from '@/features/chapter/components/TitleCard';
import { TitleStatusCard } from '@/features/lesson/components/TitleStatusCard';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/components/elements/Breadcrumb';
import { useFetchCourse } from '@/hooks/useFetchCourse';
import { Loading } from '@/components/utils/Loading';

const Course: NextPage = () => {
  const attendanceId = 1;
  const [isShowedSideBar, setIsShowedSideBar] = useState(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [course] = useFetchCourse({ attendanceId });

  useEffect(() => {
    if (course !== null) {
      setIsLoading(false);
      return;
    }
  }, [course]);

  // パン屑のリンクリスト
  const links = [
    {
      title: '講座一覧',
      href: '/courses',
    },
    {
      title: course.title,
      href: '#',
    },
  ];

  // TODO 後ほど文字列に変更される
  const statusString = (status: number) => {
    switch (status) {
      case 1:
        return 'not_started';
      case 2:
        return 'in_progress';
      case 3:
        return 'completed';
      default:
        return 'not_started';
    }
  };

  return (
    <>
      <Header />
      <div className="flex">
        {isLoading ? (
          <div className="w-3/4 mx-auto min-h-[100vh] mt-10 mb-10">
            <Loading />
          </div>
        ) : (
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
                    <div className="bg-[#FFCDCD] w-full text-center">
                      <p className="font-semibold text-[36px] pt-[30px] pb-[20px]">{course.title}</p>
                      <ProgressBar progress={100} />
                      <p className="font-semibold text-[26px] pt-[20px] pb-[30px]">
                        {course.attendance.progress}% <span className="font-semibold text-[14px]">完了</span>
                      </p>
                    </div>
                  </li>
                </ul>
                <ToggleButton isShowedSideBar={isShowedSideBar} setIsShowedSideBar={setIsShowedSideBar} />
              </SideBar>
            ) : (
              <ToggleButton isShowedSideBar={isShowedSideBar} setIsShowedSideBar={setIsShowedSideBar} />
            )}
            <div className="w-3/4 mx-auto min-h-[100vh] mb-10">
              <Breadcrumb links={links} />
              <div className="pb-10 border-black border-b mt-[30px] md:hidden">
                <Thumbnail
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + course.image}
                  alt="course"
                  height={360}
                  width={640}
                />
                <div className="bg-[#FFCDCD] w-full text-center">
                  <p className="font-semibold text-[36px] pt-[30px] pb-[20px]">{course.title}</p>
                  <ProgressBar progress={100} />
                  <p className="font-semibold text-[26px] pt-[20px] pb-[30px]">
                    {course.attendance.progress}% <span className="font-semibold text-[14px]">完了</span>
                  </p>
                </div>
              </div>
              <div className="mt-[30px]">
                <h2 className="font-semibold text-[30px] md:text-[36px]">コースカリキュラム</h2>
              </div>
              {course.chapters.map((chapter) => {
                return (
                  <div key={chapter.chapter_id}>
                    <ChapterTitleCard title={chapter.title} />
                    <div className="my-[50px] mx-auto w-11/12 text-center">
                      {chapter.lessons.map((lesson) => {
                        return (
                          <div className="my-5" key={lesson.lesson_id}>
                            <Link href="/chapter">
                              <a>
                                <TitleStatusCard
                                  status={statusString(lesson.lesson_attendance.status)}
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
        ;
      </div>
    </>
  );
};

export default Course;
