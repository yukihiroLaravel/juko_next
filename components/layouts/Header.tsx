import { FC } from 'react';
import { UserDropDown } from '../elements/UserDropDown';

type Props = {
  isLogin?: boolean;
};

export const Header: FC<Props> = ({ isLogin = true }) => {
  return (
    <nav className="w-full bg-primary h-24 sticky top-0 z-50">
      <div className="flex min-h-full justify-between">
        <div className="flex items-center">
          <a href="#" className="ml-5">
            <h1 className="font-bold text-3xl text-[#FBF459]">受講管理アプリ</h1>
          </a>
        </div>
        {isLogin && <UserDropDown />}
      </div>
    </nav>
  );
};
