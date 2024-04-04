import { Axios } from '@/lib/api';
import { FC, ReactNode } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { useRef } from 'react';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
  courseId: number | undefined
};

//TODO api取得未実装
const attendance_id = 1

export const StudentDeleteButton: FC<Props> = ({
  children,
  courseId,
}) => {
  const isSending = useRef<boolean>(false);
  const router = useRouter();

  const deleteHandler = () => {
    if (isSending.current) return;

    if (confirm('本当に削除しますか？')) {
      isSending.current = true;
      Axios.get('/sanctum/csrf-cookie').then(() => {
        Axios.delete(
          `/api/v1/instructor/attendance/${attendance_id}`
        )
          .then(() => {
            isSending.current = false;
            alert('削除しました');
            router.push(`/instructor/course/students?course_id=${courseId}`);
          })
          .catch((e) => {
            isSending.current = false;
            console.error(e);
            alert('削除に失敗しました');
          });
      });
    }
  };

  return (
    <Button type="button" color="danger" clickHandler={deleteHandler}>
        {children}
    </Button>
  );
};
