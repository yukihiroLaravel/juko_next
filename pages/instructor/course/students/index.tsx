import Box from '@/components/atoms/Box';
import { SideBar } from '@/components/atoms/SideBar/SideBar';
import { Thumbnail } from '@/components/atoms/Thumbnail/Thumbnail';
import { ToggleButton } from '@/components/atoms/Button/ToggleButton';
import { InstructorLayout } from '@/components/organisms/header/InstructorLayout';
import { Error } from '@/components/utils/Error';
import { Loading } from '@/components/utils/Loading';
import { useFetchInstructorCourse } from '@/features/course/hooks/useFetchInstructorCourse';
import { StudentsHeadingBox } from '@/features/instructor-students/components/StudentsHeadingBox';
import { StudentsTableBox } from '@/features/instructor-students/components/StudentsTableBox';
import { InstructorAuthWrapper } from '@/features/login/components/InstructorAuthWrapper';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Index: NextPage = () => {
  const router = useRouter();
  const { course_id: courseId } = router.query;
  const [isShowedSideBar, setIsShowedSideBar] = useState<boolean>(true);

  const { course, error, isLoading } = useFetchInstructorCourse({
    courseId,
  });

  return (
    <InstructorAuthWrapper>
      <InstructorLayout>
        {error && <Error />}
        {isLoading && (
          <div className="mx-auto my-10 min-h-[100vh] w-3/4">
            <Loading />
          </div>
        )}
        <div className="flex">
          {course && (
            <>
              {isShowedSideBar ? (
                <SideBar>
                  <ul className="mt-5">
                    <li className="mb-5">
                      <Thumbnail
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + course.image}
                        alt="course"
                        height={360}
                        width={640}
                      />
                    </li>
                    <li className="mb-5">
                      <div className="w-full rounded bg-[#89cada] text-center text-gray-700">
                        <p className="py-5 text-2xl font-semibold ">
                          {course.title}
                        </p>
                      </div>
                    </li>
                    <li className="mb-5">
                      <Link href={`/instructor/chapters?course_id=${courseId}`}>
                        <a className="underline">チャプター一覧</a>
                      </Link>
                    </li>
                    <li className="mb-5">
                      <Link href="#">
                        <a className="underline">お知らせ一覧</a>
                      </Link>
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
            </>
          )}
          <Box className="flex w-full flex-col items-center gap-2">
            <StudentsHeadingBox>受講生一覧</StudentsHeadingBox>
            <Box className="flex w-11/12 flex-col gap-10">
              <StudentsTableBox />
            </Box>
          </Box>
        </div>
      </InstructorLayout>
    </InstructorAuthWrapper>
  );
};

export default Index;
