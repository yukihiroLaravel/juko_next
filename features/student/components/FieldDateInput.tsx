import clsx from 'clsx';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import DatePicker from 'react-datepicker';

interface FieldInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
}

export function FieldDateInput<T extends FieldValues>({
  name,
  control,
}: FieldInputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const clx = clsx(
    'p-1',
    'rounded',
    'border-b-2',
    'w-full',
    'focus:outline-none',
    'focus:border-[#B0ABAB]'
  );

  return (
    <>
      <DatePicker
        {...field}
        dateFormat="yyyy/MM/dd"
        selected={field.value}
        onChange={(date) => {
          if (date) {
            field.onChange(date);
          }
        }}
        className={clx}
      />
      {error && <span className="text-red-600">{error.message}</span>}
    </>
  );
}
