import { FC } from 'react';
import styled from 'styled-components';

type Props = {
  status: 'not_started' | 'in_progress' | 'completed';
  size?: 's' | 'm';
};
export const StatusIcon: FC<Props> = ({ status, size = 'm' }) => {
  const getIconSize = (size: 's' | 'm') => {
    switch (size) {
      case 's':
        return {
          circleSize: '20px',
          checkIconSize: '1rem',
        };
      case 'm':
        return {
          circleSize: '30px',
          checkIconSize: '1.25rem',
        };
      default:
        return {
          circleSize: '30px',
          checkIconSize: '1.25rem',
        };
    }
  };
  const iconSize = getIconSize(size);
  switch (status) {
    case 'not_started':
      return <Icon background="#D9D9D9" size={iconSize.circleSize} />;
    case 'in_progress':
      return <Icon background="#6D8DFF" size={iconSize.circleSize} />;
    case 'completed':
      return (
        <Icon background="#F58909" size={iconSize.circleSize}>
          <IconSvg
            xmlns="http://www.w3.org/2000/IconSvg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            checkIconSize={iconSize.checkIconSize}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </IconSvg>
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
  display: flex;
  align-items: center;
`;

const IconSvg = styled.svg`
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 auto;
  color: white;
  width: ${(props) => props.checkIconSize};
  height: ${(props) => props.checkIconSize};
`;
