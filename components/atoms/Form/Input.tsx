import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'date';
}

const Input = forwardRef<HTMLInputElement, Props>(({ type, ...rest }, ref) => {
  const inputClassName = clsx(
    'p-1',
    'rounded',
    'border-b-2',
    'focus:outline-none',
    'focus:border-[#B0ABAB]'
  );
  return <input type={type} className={inputClassName} ref={ref} {...rest} />;
});

Input.displayName = 'Input';

export default Input;
