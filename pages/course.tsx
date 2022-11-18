import Header from '@/components/layouts/Header';
import { ToggleButton } from '@/components/elements/ToggleButton';
import { ProgressBar } from '@/components/elements/ProgressBar';
import { SideBar } from '@/components/elements/SideBar';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { TitleCard as ChapterTitleCard } from '@/features/chapter/components/TitleCard';
import { TitleStatusCard } from '@/features/lesson/components/TitleStatusCard';
import { NextPage } from 'next';
import { useState } from 'react';
import { Breadcrumb } from '@/components/elements/Breadcrumb';

const Courses: NextPage = () => {
  const [isShowedSideBar, setIsShowedSideBar] = useState(true);

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
      <div className="md:flex">
        {isShowedSideBar ? (
          <SideBar>
            <ul className="mt-[30px]">
              <li className="mb-[20px]">
                <Thumbnail
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + 'course/1/thumbnail.png'}
                  alt="course"
                  height={360}
                  width={640}
                />
              </li>
              <li>
                <div className="bg-[#FFCDCD] w-full text-center">
                  <p className="font-semibold text-[36px] pt-[30px] pb-[20px]">講座名</p>
                  <ProgressBar progress={100} />
                  <p className="font-semibold text-[26px] pt-[20px] pb-[30px]">
                    100% <span className="font-semibold text-[14px]">完了</span>
                  </p>
                </div>
              </li>
            </ul>
            <ToggleButton isShowedSideBar={isShowedSideBar} setIsShowedSideBar={setIsShowedSideBar} />
          </SideBar>
        ) : (
          <ToggleButton isShowedSideBar={isShowedSideBar} setIsShowedSideBar={setIsShowedSideBar} />
        )}

        <div className="w-3/4 mx-auto min-h-[100vh]">
          <Breadcrumb links={links} />
          <div className="mt-[30px]">
            <h2 className="font-semibold text-[36px]">コースカリキュラム</h2>
          </div>
          <ChapterTitleCard title={'チャプタータイトル'} />
          <div className="mt-[50px] mx-auto w-11/12 text-center">
            <TitleStatusCard status="in_progress" title="Lesson1" />
            <TitleStatusCard status="not_started" title="Lesson2" />
            <TitleStatusCard status="completed" title="Lesson3" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
