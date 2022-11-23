import { FC } from 'react';
import styled from 'styled-components';

type Props = {
  status: 'not_started' | 'in_progress' | 'completed';
  size?: string;
};
export const StatusIcon: FC<Props> = ({ status, size = '30px' }) => {
  switch (status) {
    case 'not_started':
      return <Icon background="#D9D9D9" size={size} />;
    case 'in_progress':
      return <Icon background="#6D8DFF" size={size} />;
    case 'completed':
      return (
        <Icon background="#F58909" size={size}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 mx-auto my-1 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </Icon>
      );
  }
};

const Icon = styled.div`
  min-width: ${(props) => props.size};
  min-height: ${(props) => props.size};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 100%;
  background: ${(props) => props.background};
`;
