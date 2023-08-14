import { Axios } from '@/lib/api';
import { FC } from 'react';
import { Button } from '../elements/Button';
import Router from 'next/router';

type Props = {
  isLogin?: boolean;
};

export const Header: FC<Props> = ({ isLogin = true }) => {
  const clickHandler = () => {
    Axios.post('/logout').then((res) => {
      if (res.status === 200) {
        Router.push('/login');
      }
    });
  };

  return (
    <nav className="w-full bg-primary h-24 sticky top-0 z-50">
      <div className="flex min-h-full justify-between">
        <div className="flex items-center">
          <a href="#" className="ml-5">
            <h1 className="font-bold text-3xl text-[#FBF459]">受講管理アプリ</h1>
          </a>
        </div>
        {isLogin && (
          <div className="flex items-center mr-5">
            <Button className="bg-gray-600 hover:bg-gray-500 rounded px-2 py-2" clickHandler={clickHandler}>
              ログアウト
            </Button>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[64px] h-[64px] stroke-1 fill-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
