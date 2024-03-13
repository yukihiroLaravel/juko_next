import clsx from 'clsx';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { ja } from 'date-fns/locale';

interface FieldInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  placeholderText?: string;
}

export function FieldDateInput<T extends FieldValues>({
  name,
  control,
  placeholderText = '',
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
        locale={ja}
        selected={field.value}
        onChange={(date) => {
          field.onChange(date ? date : null);
        }}
        className={clx}
        placeholderText={placeholderText}
      />
      {error && <span className="text-red-600">{error.message}</span>}
    </>
  );
}
