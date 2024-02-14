import React, { FC, useState } from 'react';
import { Axios } from '@/lib/api';
import Router from 'next/router';
import { UserDropDown } from './presentations/UserDropDown';
import { mutate } from 'swr';
import Link from 'next/link';

export const StudentUserDropDown: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = async () => {
    await mutate(null, false);
    await Axios.post('/logout').then((res) => {
      if (res.status === 200) {
        Router.push('/login');
      }
    });
  };

  return (
    <UserDropDown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      logoutHandler={clickHandler}
      renderUserEditLink={() => (
        <Link href="/student/edit">
          <a className="block px-4 py-2 text-sm text-gray-700">
            ユーザー情報編集
          </a>
        </Link>
      )}
    />
  );
};
