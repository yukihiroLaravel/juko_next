import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  color?: 'primary' | 'danger' | 'secondary';
  className?: string;
  clickHandler?: () => void;
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
};

export const Button: FC<Props> = ({
  children,
  type = 'submit',
  color = 'primary',
  className,
  clickHandler,
  size = 'md',
  isDisabled,
}) => {
  const buttonClassName = clsx(
    'rounded',
    color === 'primary' && 'bg-primary',
    color === 'danger' && 'bg-danger',
    color === 'secondary' && 'bg-slate-300',
    'text-white',
    size === 'sm' && 'px-2 py-1 text-sm',
    size === 'md' && 'px-4 py-2 text-base',
    size === 'lg' && 'px-6 py-3 text-lg',
    className
  );

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={clickHandler}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
