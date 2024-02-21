import Box from '@/components/atoms/Box';
import { Form } from '@/components/atoms/Form';
import Input from '@/components/atoms/Form/Input';
import { Button } from '@/components/elements/Button';

export const StudentsSearchForm: React.FC = () => {
  return (
    <Form className="flex flex-col gap-3">
      <label>名前/メールアドレス</label>
      <Input type="text" />
      <label>受講日</label>
      <Box className="flex gap-2">
        <Input type="date" />
        <span>~</span>
        <Input type="date" />
      </Box>
      <Button type="submit">検索</Button>
    </Form>
  );
};
