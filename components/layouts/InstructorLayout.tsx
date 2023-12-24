import { FC } from 'react';
import { InstructorHeader } from './InstructorHeader';

type Props = {
  children: React.ReactNode;
};
export const InstructorLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <InstructorHeader />
      <main>{children}</main>
    </>
  );
};
