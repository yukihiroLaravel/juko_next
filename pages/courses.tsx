import { NextPage } from 'next';
import { useState } from 'react';
import Header from '@/components/layouts/Header';
import CourseCardList from '@/features/course/components/CourseCardList';
import { Loading } from '@/components/utils/Loading';
import { useFetchCourses } from '@/hooks/useFetchCourses';
import { Error } from '@/components/utils/Error';
import { AuthWrapper } from '@/features/login/components/AuthWrapper';

const Courses: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [courses] = useFetchCourses({ setIsLoading, setIsError });
  return (
    <AuthWrapper>
      <Header />
      <div className="w-full border-[#100D59] border-b-2 mb-[56px]">
        <div className="mt-[72px] ml-[56px]">
          <h2 className="font-semibold text-[36px]">講座一覧</h2>
        </div>
      </div>
      <div className="container mx-auto mb-10">
        {isLoading ? <Loading /> : <CourseCardList courses={courses} />}
        {isError && <Error />}
      </div>
    </AuthWrapper>
  );
};

export default Courses;
