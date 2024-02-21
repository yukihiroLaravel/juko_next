import { forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'date';
}

const Input = forwardRef<HTMLInputElement, Props>(({ type, ...rest }, ref) => {
  return <input type={type} ref={ref} {...rest} />;
});

Input.displayName = 'Input';

export default Input;
