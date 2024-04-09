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
        <div className="px-4 pt-2 flex gap-4">
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
        <div className="grid grid-cols-2 gap-4 p-4">
          <p className="font-semibold">ユーザー名（仮）:</p>
          <p>{Student?.given_name_by_instructor}</p>

          <p className="font-semibold">メールアドレス:</p>
          <p>{Student?.email}</p>

          <p className="font-semibold">姓:</p>
          <p>{Student?.first_name}</p>

          <p className="font-semibold">名:</p>
          <p>{Student?.last_name}</p>

          <p className="font-semibold">職業:</p>
          <p>{Student?.occupation}</p>

          <p className="font-semibold">目的:</p>
          <p>{Student?.purpose}</p>

          <p className="font-semibold">性別:</p>
          <p>{Student?.sex}</p>

          <p className="font-semibold">住所:</p>
          <p>{Student?.address}</p>

          <p className="font-semibold">誕生日:</p>
          <p>{Student?.birth_date}</p>

          <p className="font-semibold">登録日:</p>
          <p>{Student?.created_at}</p>

          <p className="font-semibold">最終ログイン日:</p>
          <p>{Student?.last_login_at}</p>
        </div>
      </div>
    </>
  );
};
