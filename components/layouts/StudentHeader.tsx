import { FC } from 'react';
import { StudentUserDropDown } from '../StudentUserDropDown';
import { Header } from './presentations/Header';

type Props = {
  isLogin?: boolean;
};

export const StudentHeader: FC<Props> = ({ isLogin = true }) => {
  return (
    <Header
      isLogin={isLogin}
      renderUserDropDown={() => <StudentUserDropDown />}
    />
  );
};
