import React, { forwardRef, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Box = forwardRef<HTMLDivElement, Props>(
  ({ children, ...params }, ref) => {
    return (
      <div ref={ref} {...params}>
        {children}
      </div>
    );
  }
);

Box.displayName = 'Box';

export default Box;
