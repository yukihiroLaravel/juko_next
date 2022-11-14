import { FC } from 'react';

type Props = {
  setIsShowedSideBar: (value: React.SetStateAction<boolean>) => void;
};
export const OpenedToggleButton: FC<Props> = ({ setIsShowedSideBar }) => {
  return (
    <button onClick={() => setIsShowedSideBar(true)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="bg-[#AAAAAA] w-6 h-10 stroke-[#D9D9D9] fill-[#D9D9D9] top-1/2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
};
