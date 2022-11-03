const CourseCard = () => {
  return (
    <div className="w-[370px] h-auto rounded-t-[10px]">
      <div className="bg-purple-500 h-[210px] rounded-t-[10px]">{/* <img src="" alt="" /> */}</div>
      <div className="h-auto  ml-[13px] mt-[16px]">
        <p className="font-semibold text-[16px] mb-[16px]">コースタイトル</p>
        <p className="font-semibold text-[16px] mb-[16px]">講師名</p>
        <p className="font-semibold text-[16px] mb-[16px]">進捗 70%</p>
      </div>
    </div>
  );
};

export default CourseCard;
