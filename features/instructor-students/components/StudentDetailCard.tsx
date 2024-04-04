import { useFetchInstructorStudent } from '../hooks/useFetchInstructorStudent';
import Image from 'next/image';
import { UserIcon } from '@/components/icons/UserIcon';
import { Typography } from '@/components/atoms/Typography';

type Props = {
  studentId: string | string[] | undefined;
};

export const StudentDetailCard: React.FC<Props> = ({
  studentId,
}) => {
  const { student: Student } = useFetchInstructorStudent({
    studentId: studentId as number | undefined,
  });

  return (
    <>
      <Typography variant="h3">基本情報</Typography>
      <div className="rounded bg-yellow-100">
        <div className="px-4 flex gap-4">
          <div>
          {Student?.profile_image ? (
                <Image
                  src={
                    process.env.NEXT_PUBLIC_IMAGE_URL + Student?.profile_image
                  }
                  alt={Student?.nick_name}
                  height={40}
                  width={40}
                />
              ) : (
                <div className="flex items-center justify-center">
                  <UserIcon size={40} />
                </div>
              )}
          </div>
          <div className="text-3xl">
           {Student?.nick_name}
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <strong>ユーザー名（仮）:</strong> {Student?.given_name_by_instructor}
          </div>
          <div className="mb-4">
            <strong>メールアドレス:</strong> {Student?.email}
          </div>
          <div className="mb-4">
            <strong>姓:</strong> {Student?.first_name}
          </div>
          <div className="mb-4">
            <strong>名:</strong> {Student?.last_name}
          </div>
          <div className="mb-4">
            <strong>職業:</strong> {Student?.occupation}
          </div>
          <div className="mb-4">
            <strong>目的:</strong> {Student?.purpose}
          </div>
          <div className="mb-4">
            <strong>性別:</strong> {Student?.sex}
          </div>
          <div className="mb-4">
            <strong>住所:</strong> {Student?.address}
          </div>
          <div className="mb-4">
            <strong>誕生日:</strong> {Student?.birth_date}
          </div>
          <div className="mb-4">
            <strong>登録日:</strong> {Student?.created_at}
          </div>
          <div>
            <strong>最終ログイン日:</strong> {Student?.last_login_at}
          </div>
        </div>
      </div>
    </>
  );
};
