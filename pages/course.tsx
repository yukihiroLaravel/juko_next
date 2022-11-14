import Header from '@/components/layouts/Header';
import { ClosedToggleButton } from '@/components/utils/ClosedToggleButton';
import { OpenedToggleButton } from '@/components/utils/OpenedToggleButton';
import { ProgressBar } from '@/components/utils/ProgressBar';
import { SideBar } from '@/components/utils/SideBar';
import { Thumbnail } from '@/components/utils/Thumbnail';
import { TitleCard as ChapterTitleCard } from '@/features/chapter/components/TitleCard';
import { TitleStatusCard } from '@/features/lesson/components/TitleStatusCard';
import { NextPage } from 'next';
import { useState } from 'react';

const Courses: NextPage = () => {
  const [isShowedSideBar, setIsShowedSideBar] = useState(true);
  return (
    <>
      <Header />
      <div className="flex">
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
            <ClosedToggleButton setIsShowedSideBar={setIsShowedSideBar} />
          </SideBar>
        ) : (
          <OpenedToggleButton setIsShowedSideBar={setIsShowedSideBar} />
        )}

        <div className="w-3/4 mx-auto min-h-[100vh]">
          <div className="mt-[72px]">
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
