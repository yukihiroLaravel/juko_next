import { FC } from 'react';
import { InstructorHeader } from './InstructorHeader';

type Props = {
  isLogin?: boolean;
  children: React.ReactNode;
};
export const InstructorLayout: FC<Props> = ({ isLogin = true, children }) => {
  return (
    <>
      <InstructorHeader isLogin={isLogin} />
      <main>{children}</main>
    </>
  );
};
