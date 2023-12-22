import { FC } from 'react';
import { InstructorUserDropDown } from '../InstructorUserDropDown';
import { Header } from './presentations/Header';

type Props = {
  isLogin?: boolean;
};

export const InstructorHeader: FC<Props> = ({ isLogin = true }) => {
  return (
    <Header
      isLogin={isLogin}
      renderUserDropDown={() => <InstructorUserDropDown />}
    />
  );
};
