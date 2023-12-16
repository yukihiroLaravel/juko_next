import clsx from 'clsx';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';

interface FieldInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  type?: 'text' | 'email' | 'date';
}

export function FieldInput<T extends FieldValues>({
  name,
  control,
  type = 'text',
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
      <input id={name} type={type} className={clx} {...field} />
      {error && <span className="text-red-600">{error.message}</span>}
    </>
  );
}
