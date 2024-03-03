import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/atoms/Table';
import { Course } from '@/features/course/types/Course';
import { Student } from '@/features/student/types/Student';
import { SortIcon } from './SortIcon';
import { dateToHumanReadable } from '@/lib/DateLogic';
import Image from 'next/image';
import { UserIcon } from '@/components/icons/UserIcon';

type Props = {
  students: Student[];
  course: Course;
  selectedSort: {
    sortBy: 'nick_name' | 'email' | 'last_login_at' | 'attendanced_at';
    order: 'asc' | 'desc';
  };
  updateParams: (
    newParams: Partial<{
      per_page: number;
      page: number;
      sort_by: 'nick_name' | 'email' | 'last_login_at' | 'attendanced_at';
      order: 'asc' | 'desc';
    }>
  ) => void;
};

export const StudentsTable: React.FC<Props> = ({
  students,
  course,
  selectedSort,
  updateParams,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>
            <div className="flex items-center justify-center">
              名前
              <SortIcon
                selectedSort={selectedSort}
                isSelected={selectedSort.sortBy === 'nick_name'}
                clickHandler={() => {
                  updateParams({
                    sort_by: 'nick_name',
                    order:
                      selectedSort.sortBy === 'nick_name' &&
                      selectedSort.order === 'asc'
                        ? 'desc'
                        : 'asc',
                    page: 1,
                  });
                }}
              />
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center justify-center">
              メールアドレス
              <SortIcon
                selectedSort={selectedSort}
                isSelected={selectedSort.sortBy === 'email'}
                clickHandler={() => {
                  updateParams({
                    sort_by: 'email',
                    order:
                      selectedSort.sortBy === 'email' &&
                      selectedSort.order === 'asc'
                        ? 'desc'
                        : 'asc',
                    page: 1,
                  });
                }}
              />
            </div>
          </TableCell>
          <TableCell>講座名</TableCell>
          <TableCell>
            <div className="flex items-center justify-center">
              最終ログイン日時
              <SortIcon
                selectedSort={selectedSort}
                isSelected={selectedSort.sortBy === 'last_login_at'}
                clickHandler={() => {
                  updateParams({
                    sort_by: 'last_login_at',
                    order:
                      selectedSort.sortBy === 'last_login_at' &&
                      selectedSort.order === 'asc'
                        ? 'desc'
                        : 'asc',
                    page: 1,
                  });
                }}
              />
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center justify-center">
              受講日
              <SortIcon
                selectedSort={selectedSort}
                isSelected={selectedSort.sortBy === 'attendanced_at'}
                clickHandler={() => {
                  updateParams({
                    sort_by: 'attendanced_at',
                    order:
                      selectedSort.sortBy === 'attendanced_at' &&
                      selectedSort.order === 'asc'
                        ? 'desc'
                        : 'asc',
                    page: 1,
                  });
                }}
              />
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.student_id}>
            <TableCell>
              {student.profile_image ? (
                <Image
                  src={
                    process.env.NEXT_PUBLIC_IMAGE_URL + student.profile_image
                  }
                  alt={student.nick_name}
                  height={40}
                  width={40}
                />
              ) : (
                <div className="flex items-center justify-center">
                  <UserIcon size={40} />
                </div>
              )}
            </TableCell>
            <TableCell>{student.nick_name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{course?.title}</TableCell>
            <TableCell>
              {dateToHumanReadable(new Date(student.last_login_at))}
            </TableCell>
            <TableCell>{student.attendanced_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
