import Header from '@/components/layouts/Header';
import { NextPage } from 'next';
import Image from 'next/image';

const Courses: NextPage = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <aside className="shrink-0 w-1/5 h-auto bg-[#F5F5F5]" aria-label="Sidebar">
          <div className="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
            <ul className="mt-[30px]">
              <li className="mb-[20px]">
                <Image
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + 'course/1/thumbnail.png'}
                  alt="course"
                  height={360}
                  width={640}
                />
              </li>
              <li>
                <div className="bg-[#FFCDCD] w-full text-center">
                  <p className="font-semibold text-[36px] pt-[30px] pb-[20px]">講座名</p>
                  <div className="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mx-auto">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="font-semibold text-[26px] pt-[20px] pb-[30px]">
                    100% <span className="font-semibold text-[14px]">完了</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </aside>
        <div className="w-3/4 mx-auto">
          <div className="mt-[72px]">
            <h2 className="font-semibold text-[36px]">コースカリキュラム</h2>
          </div>
          <div className="mt-[10px] h-[120px] bg-[#C1E5FF] text-center">
            <h3 className="font-semibold text-[36px] leading-[120px]">チャプター</h3>
          </div>
          <div className="mt-[50px]"></div>
        </div>
      </div>
    </>
  );
};

export default Courses;
