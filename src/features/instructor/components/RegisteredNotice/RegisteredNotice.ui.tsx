type Props = {
  show: boolean;
};

export function RegisteredNoticeUI({ show }: Props) {
  if (!show) return null;

  return (
    <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">
      本登録が完了しました。登録したメールアドレスとパスワードでログインしてください。
    </p>
  );
}
