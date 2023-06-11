import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';
import { useUpdateLessonAttendance } from '@/features/lessonAttendance/hooks/useUpdateLessonAttendance';
import { number } from 'yup';

type Props = {
  children: ReactNode;
  selected: boolean;
  attendId: number | undefined;
  status: string;
  lesson_id: number | undefined;
};

export const StatusButton: FC<Props> = ({ children, selected = false, attendId, status }) => {
  const background = selected ? '#D9D9D9' : '#00A5D4';

  const clickHandler = () => {
    useUpdateLessonAttendance({
          lesson_attendance_id: attendId,
          status: status
    });
    window.location.reload();
  }

  return (
    <Button
      color={background}
      disabled={selected}
      onClick={clickHandler}
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
