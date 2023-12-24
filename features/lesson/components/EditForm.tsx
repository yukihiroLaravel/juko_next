import { SwitchButton } from '@/components/elements/SwitchButton';
import { Lesson } from '../types/Lesson';
import { usePutForm } from '../hooks/usePutForm';
import FieldInput from '@/features/student/components/FieldInput';
import { Button } from '@/components/elements/Button';

type Props = {
  lesson: Lesson;
};

export const EditForm: React.FC<Props> = ({ lesson }) => {
  const { register } = usePutForm({
    lesson,
  });

  return (
    <form className="md:w-2/3 md:border mx-auto my-10 py-10 bg-white">
      <h2 className="text-center text-2xl">レッスン編集</h2>
      <div className="w-4/5 mx-auto">
        <div className="mt-10">
          <label htmlFor="title">
            <p className="font-bold mb-1">レッスンタイトル</p>
            <FieldInput defaultValue={lesson.title} />
          </label>
        </div>
        <div className="mt-10">
          <label htmlFor="url">
            <p className="font-bold mb-1">動画URL</p>
            <FieldInput defaultValue={lesson.url} {...register('url')} />
          </label>
        </div>
        <div className="mt-10">
          <p className="font-bold mb-3">非公開/公開</p>
          <SwitchButton checked={true} onChange={() => {}} />
        </div>
        <div className="mt-10">
          <p className="font-bold mb-3">テキスト</p>
          <textarea
            className="p-2 h-40 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
            defaultValue={lesson.remarks}
            {...register('remarks')}
          />
        </div>
        <div className="my-5 text-center flex justify-between">
          <Button
            type="button"
            color="danger"
            className="hover:opacity-75 py-2 px-5"
          >
            削除
          </Button>
          <Button type="submit" className="hover:opacity-75 py-2 px-5">
            更新
          </Button>
        </div>
      </div>
    </form>
  );
};
