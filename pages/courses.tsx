import Link from 'next/link';
import { NextPage } from 'next';
import { useFetchCourses } from '@/hooks/useFetchCourses';
import { CourseCard } from '@/features/course/components/CourseCard';
import { CourseHeader } from '@/features/course/components/CourseHeader';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { CourseTitle } from '@/features/course/components/CourseTitle';
import { AuthWrapper } from '@/features/login/components/AuthWrapper';
import { Loading } from '@/components/utils/Loading';
import { Error } from '@/components/utils/Error';
import { StudentLayout } from '@/components/layouts/StudentLayout';

const Courses: NextPage = () => {
  const { attendances, isLoading, error, updateText } = useFetchCourses();

  return (
    <AuthWrapper>
      <StudentLayout>
        <CourseHeader updateText={updateText} />
        {isLoading && <Loading />}
        {error && <Error />}
        <div className="container mx-auto mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
            {attendances?.map((attendance) => {
              return (
                <Link
                  key={attendance.course.course_id}
                  href={`/course?attendance_id=${attendance.attendance_id}&course_id=${attendance.course.course_id}`}
                >
                  <a>
                    <CourseCard>
                      <div className="h-auto">
                        <Thumbnail
                          src={process.env.NEXT_PUBLIC_IMAGE_URL + attendance.course.image}
                          alt="course image"
                          height={360}
                          width={640}
                        />
                      </div>
                      <div className="h-auto  ml-[13px] mt-[16px]">
                        <CourseTitle course={attendance.course} />
                        <p className="font-semibold text-[16px] mb-[16px]">
                          講師 : {attendance.course.instructor.last_name} {attendance.course.instructor.first_name}
                        </p>
                        <p className="font-semibold text-[16px] mb-[16px]">進捗 {attendance.progress}%</p>
                      </div>
                    </CourseCard>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </StudentLayout>
    </AuthWrapper>
  );
};

export default Courses;
