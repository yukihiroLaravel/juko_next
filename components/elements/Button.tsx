import { FC } from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  type: 'button' | 'submit';
  color?: 'primary' | 'danger';
  className?: string;
  clickHandler?: () => void;
};

export const Button: FC<Props> = ({ children, type, color = 'primary', className, clickHandler }) => {
  return (
    <button
      type={type}
      className={clsx(
        'rounded',
        color === 'primary' && 'bg-primary',
        color === 'danger' && 'bg-danger',
        'text-white',
        className
      )}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};
