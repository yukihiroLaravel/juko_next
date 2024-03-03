import { FC } from 'react';
import { SearchBox } from './SearchBox';

type Props = {
  updateText: (text: string) => void;
};
export const CourseHeader: FC<Props> = ({ updateText }) => {
  return (
    <div className="mb-10 w-full border-b-2 border-[#100D59]">
      <div className="mb-5 mt-10 flex justify-between">
        <h2 className="ml-20 text-3xl font-semibold">講座一覧</h2>
        <div className="mr-20 justify-end">
          <SearchBox updateText={updateText} />
        </div>
      </div>
    </div>
  );
};
