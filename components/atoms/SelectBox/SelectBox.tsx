import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  id: string;
  options: Array<{ value: string; label: string }> | undefined;
  register?: UseFormRegisterReturn | undefined;
};

export const SelectBox: FC<Props> = ({ id, options, register }) => {
  return (
    <select
      id={id}
      className="w-full rounded border-2 border-gray-300 p-1 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity/50"
      {...(register ? register : {})}
    >
      <option value="">未選択</option>
      {options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
