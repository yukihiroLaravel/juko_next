const CourseCard = () => {
  return (
    <div className="mx-[10px] lg:mx-[0px] lg:w-[300px] xl:w-[370px] h-auto border-[#100D59] border-solid border-2 rounded-[10px] overflow-hidden">
      <div className="bg-purple-500 h-[210px]">{/* <img src="" alt="" /> */}</div>
      <div className="h-auto  ml-[13px] mt-[16px] relative">
        <p className="font-semibold text-[16px] mb-[16px]">コースタイトル</p>
        <p className="font-semibold text-[16px] mb-[16px]">講師名</p>
        <p className="font-semibold text-[16px] mb-[16px]">進捗 70%</p>
        <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[24px] h-[24px] absolute right-[17px] bottom-[0px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default CourseCard;
