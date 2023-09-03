import { SearchBox } from './SearchBox';

export const CourseHeader = () => {
  return (
    <div className="w-full border-[#100D59] border-b-2 mb-10">
      <div className="mt-10 mb-5 flex justify-between">
        <h2 className="font-semibold text-3xl ml-20">講座一覧</h2>
        <div className="justify-end mr-20">
          <SearchBox />
        </div>
      </div>
    </div>
  );
};
