import Box from '@/components/atoms/Box';
import { CaretDownFilledIcon } from '@/components/icons/CaretDownFilledIcon';
import { CaretDownIcon } from '@/components/icons/CaretDownIcon';
import { CaretUpFilledIcon } from '@/components/icons/CaretUpFilledIcon';

import { FC } from 'react';

type Props = {
  selectedSort: {
    sortBy: 'nick_name' | 'email' | 'last_login_at' | 'attendanced_at';
    order: 'asc' | 'desc';
  };
  isSelected: boolean;
  clickHandler: () => void;
};
export const SortIcon: FC<Props> = ({
  selectedSort,
  isSelected,
  clickHandler,
}) => {
  const isDesc = isSelected ? selectedSort.order === 'desc' : true;
  const icon = isSelected ? (
    isDesc ? (
      <CaretDownFilledIcon />
    ) : (
      <CaretUpFilledIcon />
    )
  ) : (
    <CaretDownIcon />
  );

  return (
    <Box
      className="flex cursor-pointer items-center justify-center"
      onClick={clickHandler}
    >
      {icon}
    </Box>
  );
};
