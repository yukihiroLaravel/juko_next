import { Student } from '@/features/student/types/Student';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/atoms/Table';
import { useFetchInstructorStudents } from '../hooks/useFetchInstructorStudents';
import { useRouter } from 'next/router';
import { useFetchInstructorCourse } from '@/features/course/hooks/useFetchInstructorCourse';

export const StudentsTable: React.FC = () => {
  const router = useRouter();
  const { course_id: courseId } = router.query;

  const { course } = useFetchInstructorCourse({
    courseId,
  });

  const { students } = useFetchInstructorStudents({
    courseId: courseId as string | undefined,
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>名前</TableCell>
          <TableCell>メールアドレス</TableCell>
          <TableCell>講座名</TableCell>
          <TableCell>最終ログイン</TableCell>
          <TableCell>登録日</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students?.map((student) => (
          <TableRow key={student.student_id}>
            <TableCell>{student.student_id}</TableCell>
            <TableCell>{student.nick_name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{course?.title}</TableCell>
            <TableCell>{student.last_login_at}</TableCell>
            <TableCell>{student.attendanced_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
