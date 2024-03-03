import clsx from 'clsx';
import React, { forwardRef, ForwardedRef, ComponentPropsWithRef } from 'react';

type Props = ComponentPropsWithRef<'input'> & {
  defaultValue?: string;
  type?: string;
};

const FieldInput = forwardRef<HTMLInputElement, Props>(
  (
    { defaultValue, type = 'text', ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const clx = clsx(
      'p-1',
      'rounded',
      'border-b-2',
      'w-full',
      'focus:outline-none',
      'focus:border-[#B0ABAB]'
    );

    return (
      <input
        type={type}
        className={clx}
        defaultValue={defaultValue}
        ref={ref}
        {...props}
      />
    );
  }
);

FieldInput.displayName = 'FieldInput';

export default FieldInput;
