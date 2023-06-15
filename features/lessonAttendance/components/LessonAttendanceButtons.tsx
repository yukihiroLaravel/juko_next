import styled from 'styled-components';
import { FC } from 'react';
import { PrimaryButton } from '../atoms/PrimaryButton';

type Props = {
  children: string;
};

const LButton = styled(PrimaryButton)`
  color: #000;
`;

export const LessonAttendanceButtons: FC<Props> = ({ children }) => {
  return <LButton>{children}</LButton>;
};
