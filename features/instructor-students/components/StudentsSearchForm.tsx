import { Form } from '@/components/atoms/Form';
import Input from '@/components/atoms/Form/Input';
import { Button } from '@/components/atoms/Button/Button';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ja } from 'date-fns/locale';

type Props = {
  updateParams: (
    newParams: Partial<{
      per_page: number;
      page: number;
      sort_by: 'nick_name' | 'email' | 'last_login_at' | 'attendanced_at';
      order: 'asc' | 'desc';
    }>
  ) => void;
};

export const StudentsSearchForm: React.FC<Props> = ({ updateParams }) => {
  const [search, setSearch] = useState<{
    name: string;
    email: string;
    startDate: Date | null;
    endDate: Date | null;
  }>({
    name: '',
    email: '',
    startDate: null,
    endDate: null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <Form className="flex flex-col gap-3">
      <label>名前/メールアドレス</label>
      <Input
        type="text"
        value={search.name}
        onChange={(e) => setSearch({ ...search, name: e.target.value })}
      />
      <label>受講日</label>
      <div className="flex gap-2">
        <DatePicker
          className="p-1"
          selected={search.startDate}
          onChange={(date) => setSearch({ ...search, startDate: date })}
          locale={ja}
          dateFormat="yyyy/MM/dd"
          placeholderText="開始日"
        />
        <span>~</span>
        <DatePicker
          className="p-1"
          selected={search.endDate}
          onChange={(date) => setSearch({ ...search, endDate: date })}
          locale={ja}
          dateFormat="yyyy/MM/dd"
          placeholderText="終了日"
        />
      </div>
      <Button type="submit">検索</Button>
    </Form>
  );
};
