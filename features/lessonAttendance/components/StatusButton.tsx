import { Axios } from '@/lib/api';
import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';

type Props = {
  children: ReactNode;
  selected: boolean;
  lessonAttendance: LessonAttendance;
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

export const StatusButton: FC<Props> = ({ children, selected = false, lessonAttendance }) => {
  const background = selected ? '#D9D9D9' : '#00A5D4';

  const clickHandler = async () => {
    await Axios.patch('api/v1/lesson_attendance', {
      lesson_attendance_id: lessonAttendance.lesson_attendance_id,
      status: lessonAttendance.status,
    }).then(() => window.location.reload());
  };

  return (
    <Button color={background} disabled={selected} onClick={clickHandler}>
      {children}
    </Button>
  );
};
