import { Student } from '@/features/student/types/Student';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/atoms/Table';

type Props = {
  // students: Student[];
};

export const StudentsTable: React.FC<Props> = (
  {
    // students
  }
) => {
  const students = [
    {
      id: 1,
      name: 'John Doe',
      email: 'test@examle.com',
      courseTitle: 'React入門',
      lastLogin: '2021/07/01',
      createdAt: '2021/07/01',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'test2@examle.com',
      courseTitle: 'Vue入門',
      lastLogin: '2021/07/01',
      createdAt: '2021/07/01',
    },
  ];

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
          <TableRow key={student.id}>
            <TableCell>{student.id}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.courseTitle}</TableCell>
            <TableCell>{student.lastLogin}</TableCell>
            <TableCell>{student.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
