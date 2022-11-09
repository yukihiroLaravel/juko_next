import Header from '@/components/layouts/Header';
import { NextPage } from 'next';
import Image from 'next/image';

const Courses: NextPage = () => {
  return (
    <>
      <Header />
      <aside className="w-[300px] h-auto bg-[#F5F5F5]" aria-label="Sidebar">
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
                <p className="font-semibold text-[26px] pt-[20px] pb-[30px]">
                  100% <span className="font-semibold text-[14px]">完了</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Courses;
