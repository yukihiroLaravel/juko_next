import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/atoms/Table';
import { Course } from '@/features/course/types/Course';
import { Student } from '@/features/student/types/Student';

type Props = {
  students: Student[];
  course: Course;
};

export const StudentsTable: React.FC<Props> = ({ students, course }) => {
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
        {students.map((student) => (
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
