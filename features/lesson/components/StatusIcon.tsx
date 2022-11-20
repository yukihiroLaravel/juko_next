import { FC } from 'react';

type Props = {
  status: 'not_started' | 'in_progress' | 'completed';
};
export const StatusIcon: FC<Props> = ({ status }) => {
  switch (status) {
    case 'not_started':
      return <div className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] rounded-full bg-[#D9D9D9] mt-[10px]" />;
    case 'in_progress':
      return <div className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] rounded-full bg-[#6D8DFF] mt-[10px]" />;
    case 'completed':
      return (
        <div className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] rounded-full bg-[#F58909] mt-[10px] text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 mx-auto my-1 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      );
  }
};
