import Header from '@/components/layouts/Header';
import { ToggleButton } from '@/components/elements/ToggleButton';
import { ProgressBar } from '@/components/elements/ProgressBar';
import { SideBar } from '@/components/elements/SideBar';
import { NextPage } from 'next';
import { useState } from 'react';
import { Breadcrumb } from '@/components/elements/Breadcrumb';
import { StatusIcon } from '@/features/lesson/components/StatusIcon';
import { StatusButton } from '@/features/lesson/components/StatusButton';
import { Movie } from '@/components/elements/Movie';
import { useWindowSize } from '@/hooks/useWindowSize';

const Chapter: NextPage = () => {
  const [isShowedSideBar, setIsShowedSideBar] = useState(true);

  const [width] = useWindowSize();

  // パン屑のリンクリスト
  const links = [
    {
      title: '講座一覧',
      href: '/courses',
    },
    {
      title: '講座名',
      href: '/course',
    },
    {
      title: 'レッスン名',
      href: '#',
    },
  ];

  return (
    <>
      <Header />
      <div className="flex">
        {isShowedSideBar ? (
          <SideBar>
            <ul className="mt-[30px]">
              <li className="mb-[20px]">
                <div className="">
                  <p className="text-[18px] font-semibold mb-3">チャプター進捗 33%</p>
                  <ProgressBar progress={33} />
                </div>
              </li>
              <li>
                <a href="#">
                  <div className="border-[#B5B5B5] border-t-2 min-h-[65px] flex items-center justify-between">
                    <p className="text-[18px] text-[#6D8DFF] font-semibold">Lesson 1</p>
                    <StatusIcon status="in_progress" size="s" />
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="border-[#B5B5B5] border-t-2 min-h-[65px] flex items-center justify-between">
                    <p className="text-[18px] text-[#B5B5B5] font-semibold">Lesson 2</p>
                    <StatusIcon status="not_started" size="s" />
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="border-[#B5B5B5] border-t-2 min-h-[65px] flex items-center justify-between">
                    <p className="text-[18px] text-[#B5B5B5] font-semibold">Lesson 3</p>
                    <StatusIcon status="not_started" size="s" />
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="border-[#F58909] border-t-2 min-h-[65px] flex items-center justify-between">
                    <p className="text-[18px] text-[#F58909] font-semibold">Lesson 4</p>
                    <StatusIcon status="completed" size="s" />
                  </div>
                </a>
              </li>
            </ul>
            <ToggleButton isShowedSideBar={isShowedSideBar} setIsShowedSideBar={setIsShowedSideBar} />
          </SideBar>
        ) : (
          <ToggleButton isShowedSideBar={isShowedSideBar} setIsShowedSideBar={setIsShowedSideBar} />
        )}

        <div className="w-3/4 mx-auto min-h-[100vh] mb-10">
          <Breadcrumb links={links} />
          <div className="mt-[20px] border-black border-b pb-5">
            <h2 className="font-semibold text-[30px] md:text-[36px]">チャプタータイトル</h2>
          </div>
          <ul className="md:hidden mt-[30px] border-black border-b">
            <li className="mb-[20px]">
              <div className="">
                <p className="text-[18px] font-semibold mb-3">チャプター進捗 33%</p>
                <ProgressBar progress={33} />
              </div>
            </li>
            <li>
              <a href="#">
                <div className="border-[#B5B5B5] border-t-2 min-h-[65px] flex items-center justify-between">
                  <p className="text-[18px] text-[#6D8DFF] font-semibold">Lesson 1</p>
                  <StatusIcon status="in_progress" size="s" />
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="border-[#B5B5B5] border-t-2 min-h-[65px] flex items-center justify-between">
                  <p className="text-[18px] text-[#B5B5B5] font-semibold">Lesson 2</p>
                  <StatusIcon status="not_started" size="s" />
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="border-[#B5B5B5] border-t-2 min-h-[65px] flex items-center justify-between">
                  <p className="text-[18px] text-[#B5B5B5] font-semibold">Lesson 3</p>
                  <StatusIcon status="not_started" size="s" />
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="border-[#F58909] border-t-2 min-h-[65px] flex items-center justify-between">
                  <p className="text-[18px] text-[#F58909] font-semibold">Lesson 4</p>
                  <StatusIcon status="completed" size="s" />
                </div>
              </a>
            </li>
          </ul>
          <div className="mt-5 mx-auto">
            <h2 className="font-semibold text-[25px] md:text-[30px]">レッスンタイトル</h2>
          </div>
          <div className="my-5 overflow-auto">
            <Movie
              videoId={'rneIc3LX1vs'}
              height={(width as number) > 640 ? 720 : 180}
              width={(width as number) > 640 ? 1280 : 320}
            />
          </div>
          <div className="flex justify-start">
            <StatusButton selected={true}>Lesson未実施</StatusButton>
            <span className="ml-10" />
            <StatusButton selected={false}>Lesson開始</StatusButton>
            <span className="ml-10" />
            <StatusButton selected={false}>Lesson完了</StatusButton>
          </div>
          <div className="mt-5">
            <p>Index</p>
            <p>
              ・本レッスンの概要 0:30~ <br />
              ・プログラミングとは 1:00~
              <br />
              ・PHPとはどんな言語 4:00~ <br />
              ・PHPで計算してみよう 7:00~ <br />
              ・まとめ 9:00~
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chapter;
