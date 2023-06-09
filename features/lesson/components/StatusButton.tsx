import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  selected: boolean;
  attendId: number | undefined;
  status: string | undefined;
  clickChangeLessonAttendance: Function;
};

export const StatusButton: FC<Props> = ({ children, selected = false, clickChangeLessonAttendance, attendId, status }) => {
  const background = selected ? '#D9D9D9' : '#00A5D4';
  console.log(status);
  return (
    <Button
      color={background}
      disabled={selected}
      onClick={() => clickChangeLessonAttendance(attendId, status)}
    >
      {children}
    </Button>
  );
};

const Button = styled.button`
  border: 1px solid black;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background: ${(props) => props.color};
  @media (max-width: 640px) {
    font-size: 13px;
  }
`;
