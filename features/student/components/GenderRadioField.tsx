import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';

export function GenderRadioField({
  control,
}: {
  control: Control<FieldValues>;
}) {
  const { field } = useController({
    name: 'sex',
    control,
  });

  return (
    <>
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio"
          defaultChecked={field.value === 'man'}
          {...field}
        />
        <span className="ml-2">男性</span>
      </label>
      <label className="inline-flex items-center ml-6">
        <input
          type="radio"
          className="form-radio"
          defaultChecked={field.value === 'woman'}
          {...field}
        />
        <span className="ml-2">女性</span>
      </label>
    </>
  );
}
