import { FC } from 'react';
import { StudentHeader } from './StudentHeader';

type Props = {
  children: React.ReactNode;
};
export const StudentLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <StudentHeader />
      <main>{children}</main>
    </>
  );
};
