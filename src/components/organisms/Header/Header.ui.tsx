import { UserDropDown } from '@/features/user/components/UserDropDown';

export function HeaderUI() {
  return (
    <header className="border-b bg-primary">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-bold text-[#FBF459]">受講管理アプリ</h1>
        <UserDropDown />
      </div>
    </header>
  );
}
