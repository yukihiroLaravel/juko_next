import clsx from 'clsx';
import React from 'react';

type Props = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  children: React.ReactNode;
};

export const Typography: React.FC<Props> = ({ variant, children }) => {
  const className = clsx('font-bold', {
    'text-4xl': variant === 'h1',
    'text-3xl': variant === 'h2',
    'text-2xl': variant === 'h3',
    'text-xl': variant === 'h4',
    'text-lg': variant === 'h5' || variant === 'body1',
    'text-base': variant === 'h6' || variant === 'body2',
    'py-5': variant === 'h1',
    'py-4': variant === 'h2',
    'py-3': variant === 'h3',
    'py-2': variant === 'h4',
    'py-1': variant === 'h5' || variant === 'body1',
    'py-0': variant === 'h6' || variant === 'body2',
    'px-5': variant === 'h1',
    'px-4': variant === 'h2',
    'px-3': variant === 'h3',
    'px-2': variant === 'h4',
    'px-1': variant === 'h5' || variant === 'body1',
    'px-0': variant === 'h6' || variant === 'body2',
  });

  const types = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body1: 'p',
    body2: 'p',
  };

  return React.createElement(types[variant], { className }, children);
};
