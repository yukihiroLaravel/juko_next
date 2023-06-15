import styled from 'styled-components';
import { FC } from 'react';

type Props = {
  children: string;
};

export const SButton = styled.button`
  border: none;
  border-radius: 6px;
  outline: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const Button: FC<Props> = ({ children }) => {
  return <SButton>{children}</SButton>;
};
