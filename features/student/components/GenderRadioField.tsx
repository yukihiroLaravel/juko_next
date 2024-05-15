import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';

export function GenderRadioField<T extends FieldValues>({
  name,
  control,
}: {
  name: FieldPath<T>;
  control: Control<T>;
}) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <>
      <label className="inline-flex items-center">
        <input
          type="radio"
          defaultChecked={field.value === 'man'}
          {...field}
          value={'man'}
        />
        <span className="ml-2">男性</span>
      </label>
      <label className="ml-6 inline-flex items-center">
        <input
          type="radio"
          defaultChecked={field.value === 'woman'}
          {...field}
          value={'woman'}
        />
        <span className="ml-2">女性</span>
      </label>
    </>
  );
}
