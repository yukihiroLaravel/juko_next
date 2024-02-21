import Box from '@/components/atoms/Box';
import { FC } from 'react';
import { StudentsSearchForm } from './StudentsSearchForm';
import { StudentsTable } from './StudentsTable';
import { Pagination } from '@/components/atoms/Pagination';
import { useFetchInstructorCourse } from '@/features/course/hooks/useFetchInstructorCourse';
import { useFetchInstructorStudents } from '../hooks/useFetchInstructorStudents';
import { useRouter } from 'next/router';

export const StudentsTableBox: FC = () => {
  const router = useRouter();
  const { course_id: courseId } = router.query;

  const { course } = useFetchInstructorCourse({
    courseId,
  });

  const { students, pagination, updateParams } = useFetchInstructorStudents({
    courseId: courseId as string | undefined,
  });

  return (
    <>
      <Box className="flex items-end justify-end">
        <StudentsSearchForm />
      </Box>
      {students && course && (
        <StudentsTable students={students} course={course} />
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
