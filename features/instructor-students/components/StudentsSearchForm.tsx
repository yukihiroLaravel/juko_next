import { Form } from '@/components/atoms/Form';
import Input from '@/components/atoms/Form/Input';
import { Button } from '@/components/atoms/Button/Button';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { FieldDateInput } from '@/components/atoms/Field/FieldDateInput';

type Props = {
  updateParams: (
    newParams: Partial<{
      per_page: number;
      page: number;
      sort_by: 'nick_name' | 'email' | 'last_login_at' | 'attendanced_at';
      order: 'asc' | 'desc';
      input_text: string;
      start_date: string;
      end_date: string;
    }>
  ) => void;
};

type FormValues = {
  name: string;
  email: string;
  startDate: Date | null;
  endDate: Date | null;
};

export const StudentsSearchForm: React.FC<Props> = ({ updateParams }) => {
  const { register, handleSubmit, control
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      startDate: null,
      endDate: null,
    },
  });
  const submitHandler = (data: FormValues) => {
    const { name, startDate, endDate } = data;
    updateParams({
      input_text: name,
      start_date: startDate ? format(startDate, 'yyyy-MM-dd') : '',
      end_date: endDate ? format(endDate, 'yyyy-MM-dd') : '',
    });
  };

  return (
    <Form className="flex flex-col gap-3" onSubmit={handleSubmit(submitHandler)}>
      <label>名前/メールアドレス</label>
      <Input
        type="text"
        {...register('name')}
      />
      <label>受講日</label>
      <div className="flex gap-2">
        <FieldDateInput name="startDate" control={control} placeholderText="開始日"/>
        <span>~</span>
        <FieldDateInput name="endDate" control={control} placeholderText="終了日"/>
      </div>
      <Button type="submit">検索</Button>
    </Form>
  );
};
