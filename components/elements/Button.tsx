import { FC } from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  type: 'button' | 'submit';
  color?: 'primary';
  className?: string;
};

export const Button: FC<Props> = ({ children, type, color = 'primary', className }) => {
  return (
    <button type={type} className={clsx('rounded', color === 'primary' && 'bg-primary', 'text-white', className)}>
      {children}
    </button>
  );
};
