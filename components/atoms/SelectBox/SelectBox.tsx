import { UseFormRegister } from 'react-hook-form';

type SelectBoxProps<T extends string | number> = {
  options: Array<{ value: T; label: string }> | undefined;
  register?: UseFormRegister<any>;
  name?: string;
};

export const SelectBox = <T extends string | number>({
  options,
  register,
  name,
}: SelectBoxProps<T>) => {
  return (
    <select
      id="courseName"
      className="block mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      {...(register && name ? register(name) : {})}
    >
      {options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
