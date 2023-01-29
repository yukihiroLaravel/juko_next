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
      title: '講座名',
      href: '#',
    },
  ];

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
              {/* {チャプターは複数存在する。} */}
              {course.chapters.map((chapter) => {
                return (
                  <>
                    <ChapterTitleCard title={chapter.title} />
                    <div className="mt-[50px] mx-auto w-11/12 text-center">
                      <Link href="/chapter">
                        <a>
                          <TitleStatusCard status="in_progress" title="Lesson1" />
                        </a>
                      </Link>
                      <Link href="/chapter">
                        <a>
                          <TitleStatusCard status="not_started" title="Lesson2" />
                        </a>
                      </Link>
                      <Link href="/chapter">
                        <a>
                          <TitleStatusCard status="completed" title="Lesson3" />
                        </a>
                      </Link>
                    </div>
                  </>
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
