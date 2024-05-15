import { FC } from 'react';

type Props = {
  isShowedSideBar: boolean;
  setIsShowedSideBar: (value: React.SetStateAction<boolean>) => void;
};

export const ToggleButton: FC<Props> = ({
  isShowedSideBar,
  setIsShowedSideBar,
}) => {
  return isShowedSideBar ? (
    <button onClick={() => setIsShowedSideBar(false)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute right-[-24px] top-1/2 h-10 w-6 bg-[#AAAAAA] fill-[#D9D9D9] stroke-[#D9D9D9]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  ) : (
    <button
      className="hidden md:block"
      onClick={() => setIsShowedSideBar(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="top-1/2 h-10 w-6 bg-[#AAAAAA] fill-[#D9D9D9] stroke-[#D9D9D9]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  );
};
