import React, { FC, useState } from 'react';
import { Axios } from '@/lib/api';
import Router from 'next/router';
import { UserDropDown } from './presentations/UserDropDown';

export const StudentUserDropDown: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    Axios.post('/logout').then((res) => {
      if (res.status === 200) {
        Router.push('/login');
      }
    });
  };

  return <UserDropDown isOpen={isOpen} setIsOpen={setIsOpen} logoutHandler={clickHandler} />;
};
