import Link from 'next/link';
import React, { FC, ReactNode } from 'react';

type Props = {
  isLogin?: boolean;
  homeUrl: string;
  renderUserDropDown: () => ReactNode;
};

export const Header: FC<Props> = ({ isLogin = true, homeUrl, renderUserDropDown }) => {
  return (
    <nav className="sticky top-0 z-50 h-24 w-full bg-primary">
      <div className="flex min-h-full justify-between">
        <div className="flex items-center">
          <Link href={homeUrl} className="ml-5">
            <h1 className="cursor-pointer text-3xl font-bold text-[#FBF459]">
              受講管理アプリ
            </h1>
          </Link>
        </div>
        {isLogin && renderUserDropDown()}
      </div>
    </nav>
  );
};
