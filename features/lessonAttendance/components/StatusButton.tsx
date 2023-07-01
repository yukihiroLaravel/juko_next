import { Axios } from '@/lib/api';
import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';
import { Button } from '@/components/elements/Button';
import useSWRMutation from 'swr/mutation';

type Props = {
  children: ReactNode;
  selected: boolean;
  lessonAttendance: LessonAttendance;
  mutate: () => Promise<Response | undefined>;
};

const SButton = styled(Button)`
  font-size: 20px;
  padding: 0.5rem 1rem;
  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

export const StatusButton: FC<Props> = ({ children, selected = false, lessonAttendance, mutate }) => {
  const color = selected ? 'secondary' : 'primary';

  const clickHandler = async () => {
    await Axios.patch('api/v1/lesson_attendance', {
      lesson_attendance_id: lessonAttendance.lesson_attendance_id,
      status: lessonAttendance.status,
    });
    mutate();
  };

  return (
    <SButton type="button" color={color} clickHandler={clickHandler}>
      {children}
    </SButton>
  );
};
