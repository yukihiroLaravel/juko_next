import { SideBar } from '@/components/atoms/SideBar/SideBar';
import { Thumbnail } from '@/components/atoms/Thumbnail/Thumbnail';
import { ToggleButton } from '@/components/atoms/Button/ToggleButton';
import { InstructorLayout } from '@/components/organisms/header/InstructorLayout';
import { Error } from '@/components/utils/Error';
import { Loading } from '@/components/utils/Loading';
import { useFetchInstructorCourse } from '@/features/course/hooks/useFetchInstructorCourse';
import { InstructorAuthWrapper } from '@/features/login/components/Auth/InstructorAuthWrapper';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { StudentDetailCard } from '@/features/instructor-students/components/StudentDetailCard';
import { StudentDeleteButton } from '@/features/instructor-students/components/StudentDeleteButton';
import { Typography } from '@/components/atoms/Typography';
import { StudentAttendanceStatusCard } from '@/features/instructor-students/components/StudentAttendanceStatusCard';

const Index: NextPage = () => {
  const router = useRouter();
  const { course_id: courseId, id: student_id} = router.query;
  const [isShowedSideBar, setIsShowedSideBar] = useState<boolean>(true);

  const { course, error, isLoading } = useFetchInstructorCourse({
    courseId
  });
  const course_id_type_int = typeof courseId === 'string' ? parseInt(courseId) : undefined;
  
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
                      <Link href={`/instructor/course/students/?course_id=${courseId}`}>
                        <a className="underline">受講生一覧</a>
                      </Link>
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
          <div className="mx-auto min-h-[100vh] w-3/4 flex flex-col gap-5">
            <div className="flex w-full items-center justify-between p-2">
                <Typography variant="h1">受講生詳細</Typography>
            </div>
            <div>
              <StudentDetailCard
                studentId={student_id}
              />
            </div>
            <div>
              <StudentAttendanceStatusCard
                courseId={course_id_type_int}
                studentId={student_id}
              />
            </div>
            <div>
              <StudentDeleteButton
              courseId={course_id_type_int}
              >
                この受講生を講座から退会
              </StudentDeleteButton>
            </div>
          </div>
        </div>
      </InstructorLayout>
    </InstructorAuthWrapper>
  );
};

export default Index;
