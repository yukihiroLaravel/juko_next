import React, { FC, ReactNode } from 'react';

type Props = {
  isLogin?: boolean;
  renderUserDropDown: () => ReactNode;
};

export const Header: FC<Props> = ({ isLogin = true, renderUserDropDown }) => {
  return (
    <nav className="sticky top-0 z-50 h-24 w-full bg-primary">
      <div className="flex min-h-full justify-between">
        <div className="flex items-center">
          <a href="#" className="ml-5">
            <h1 className="text-3xl font-bold text-[#FBF459]">
              受講管理アプリ
            </h1>
          </a>
        </div>
        {isLogin && renderUserDropDown()}
      </div>
    </nav>
  );
};
