import { FC } from 'react';
import { StudentsSearchForm } from './StudentsSearchForm';
import { StudentsTable } from './StudentsTable';
import { Pagination } from '@/components/atoms/Pagination/Pagination';
import { useFetchInstructorCourse } from '@/features/course/hooks/useFetchInstructorCourse';
import { useFetchInstructorStudents } from '../hooks/useFetchInstructorStudents';
import { useRouter } from 'next/router';

export const StudentsTableBox: FC = () => {
  const router = useRouter();
  const { course_id: courseId } = router.query;

  const { course } = useFetchInstructorCourse({
    courseId,
  });

  const { students, pagination, params, updateParams } =
    useFetchInstructorStudents({
      courseId: courseId as string | undefined,
    });

  return (
    <>
      <div className="flex items-end justify-end">
        <StudentsSearchForm updateParams={updateParams} />
      </div>
      {students && course && (
        <StudentsTable
          students={students}
          course={course}
          selectedSort={{
            sortBy: params.sort_by as
              | 'nick_name'
              | 'email'
              | 'last_login_at'
              | 'attendanced_at',
            order: params.order as 'asc' | 'desc',
          }}
          updateParams={updateParams}
        />
      )}
      <Pagination
        total={pagination?.total ?? 0}
        currentPage={pagination?.page ?? 0}
        goToPage={(page: number) => {
          updateParams({ page });
        }}
      />
    </>
  );
};
