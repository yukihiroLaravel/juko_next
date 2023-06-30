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
};

const SButton = styled(Button)`
  font-size: 20px;
  padding: 0.5rem 1rem;
  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

export const StatusButton: FC<Props> = ({ children, selected = false, lessonAttendance }) => {
  const color = selected ? 'secondary' : 'primary';

  const res = async (url: string) =>
    await Axios.patch(url, {
      lesson_attendance_id: lessonAttendance.lesson_attendance_id,
      status: lessonAttendance.status,
    }).then((res) => res.data);
  const { trigger } = useSWRMutation('api/v1/lesson_attendance', res);

  return (
    <SButton type="button" color={color} clickHandler={() => trigger()}>
      {children}
    </SButton>
  );
};
