import { NextPage } from 'next';
import { useState } from 'react';
import { Header } from '@/components/layouts/Header';
import { Loading } from '@/components/utils/Loading';
import { useFetchInstructorCourses } from '@/features/course/hooks/useFetchInstructorCourses';
import { Error } from '@/components/utils/Error';
import { CourseCard } from '@/features/course/components/CourseCard';
import { CourseHeader } from '@/features/course/components/CourseHeader';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { CourseTitle } from '@/features/course/components/CourseTitle';

const InstructorCourses: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [courses] = useFetchInstructorCourses({ setIsLoading, setIsError });

  return (
    <>
      <Header />
      <CourseHeader />
      <div className="container mx-auto mb-10">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
            {courses.map((course) => {
              return (
                <CourseCard key={course.course_id}>
                  <div className="h-auto">
                    <Thumbnail
                      src={process.env.NEXT_PUBLIC_IMAGE_URL + course.image}
                      alt="children"
                      height={360}
                      width={640}
                    />
                  </div>
                  <div className="h-auto  ml-[13px] mt-[16px]">
                    <CourseTitle course={course} />
                  </div>
                </CourseCard>
              );
            })}
          </div>
        )}
        {isError && <Error />}
      </div>
    </>
  );
};

export default InstructorCourses;
