import { NextPage } from 'next';
import { Loading } from '@/components/utils/Loading';
import { Error } from '@/components/utils/Error';
import { CourseCard } from '@/features/course/components/CourseCard';
import { CourseHeader } from '@/features/course/components/CourseHeader';
import { Thumbnail } from '@/components/atoms/Thumbnail/Thumbnail';
import { CourseTitle } from '@/features/course/components/CourseTitle';
import { InstructorAuthWrapper } from '@/features/login/components/Auth/InstructorAuthWrapper';
import Link from 'next/link';
import { InstructorLayout } from '@/components/organisms/header';
import { useFetchInstructorCourses } from '@/features/course/hooks/useFetchInstructorCourses';

const Index: NextPage = () => {
  const { courses, isLoading, error, updateText } = useFetchInstructorCourses();

  return (
    <InstructorAuthWrapper>
      <InstructorLayout>
        <CourseHeader updateText={updateText} />
        <div className="container mx-auto mb-10">
          {isLoading && <Loading />}
          {error && <Error />}
          <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-3">
            {courses?.map((course) => {
              return (
                <Link
                  key={course.course_id}
                  href={`/instructor/chapters?course_id=${course.course_id}`}
                >
                  <a>
                    <CourseCard>
                      <div className="h-auto">
                        <Thumbnail
                          src={process.env.NEXT_PUBLIC_IMAGE_URL + course.image}
                          alt="children"
                          height={360}
                          width={640}
                        />
                      </div>
                      <div className="ml-[13px]  mt-[16px] h-auto">
                        <CourseTitle course={course} />
                      </div>
                    </CourseCard>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </InstructorLayout>
    </InstructorAuthWrapper>
  );
};

export default Index;
