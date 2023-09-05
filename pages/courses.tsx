import Link from 'next/link';
import { NextPage } from 'next';
import { Header } from '@/components/layouts/Header';
import { useFetchCourses } from '@/hooks/useFetchCourses';
import { CourseCard } from '@/features/course/components/CourseCard';
import { CourseHeader } from '@/features/course/components/CourseHeader';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { CourseTitle } from '@/features/course/components/CourseTitle';
import { AuthWrapper } from '@/features/login/components/AuthWrapper';
import { Loading } from '@/components/utils/Loading';
import { Error } from '@/components/utils/Error';

const Courses: NextPage = () => {
  const { courses, isLoading, error, updateText } = useFetchCourses();

  return (
    <AuthWrapper>
      <Header />
      <CourseHeader updateText={updateText} />
      {isLoading && <Loading />}
      {error && <Error />}
      <div className="container mx-auto mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
          {courses?.map((course) => {
            return (
              <Link key={course.course_id} href={'/course?attendance_id=' + course.attendance.attendance_id}>
                <a>
                  <CourseCard>
                    <div className="h-auto">
                      <Thumbnail
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + course.image}
                        alt="course image"
                        height={360}
                        width={640}
                      />
                    </div>
                    <div className="h-auto  ml-[13px] mt-[16px]">
                      <CourseTitle course={course} />
                      <p className="font-semibold text-[16px] mb-[16px]">
                        講師 : {course.instructor.last_name} {course.instructor.first_name}
                      </p>
                      <p className="font-semibold text-[16px] mb-[16px]">進捗 {course.attendance.progress}%</p>
                    </div>
                  </CourseCard>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Courses;
