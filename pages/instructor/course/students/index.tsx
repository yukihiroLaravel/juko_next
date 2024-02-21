import Box from '@/components/atoms/Box';
import { Pagination } from '@/components/atoms/Pagination';
import { SideBar } from '@/components/elements/SideBar';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { ToggleButton } from '@/components/elements/ToggleButton';
import { InstructorLayout } from '@/components/layouts/InstructorLayout';
import { useFetchInstructorCourse } from '@/features/course/hooks/useFetchInstructorCourse';
import { StudentsHeadingBox } from '@/features/instructor-students/components/StudentsHeadingBox';
import { StudentsSearchForm } from '@/features/instructor-students/components/StudentsSearchForm';
import { StudentsTable } from '@/features/instructor-students/components/StudentsTable';
import { InstructorAuthWrapper } from '@/features/login/components/InstructorAuthWrapper';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Index: NextPage = () => {
  const router = useRouter();
  const { course_id: courseId } = router.query;
  const [isShowedSideBar, setIsShowedSideBar] = useState<boolean>(true);

  const { course, isLoading, error, mutate } = useFetchInstructorCourse({
    courseId,
  });
  return (
    <InstructorAuthWrapper>
      <InstructorLayout>
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
                      <Link href="#">
                        <a className="underline">受講生一覧</a>
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
            <Box className="flex w-4/5 flex-col gap-2">
              <Box className="flex items-end justify-end">
                <StudentsSearchForm />
              </Box>
              <StudentsTable />
              <Pagination currentPage={5} count={10} />
            </Box>
          </Box>
        </div>
      </InstructorLayout>
    </InstructorAuthWrapper>
  );
};

export default Index;
