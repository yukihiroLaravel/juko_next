import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  id: string;
  options: Array<{ value: string; label: string }> | undefined;
  register?: UseFormRegisterReturn;
};

export const SelectBox: FC<Props> = ({ id, options, register }) => {
  return (
    <select
      id={id}
      className="block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity/50"
      {...(register ? register : {})}
    >
      {options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
