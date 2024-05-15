import { Button } from '@/components/atoms/Button/Button';
import { FC, useState } from 'react';

type Props = {
  updateText: (text: string) => void;
};
export const SearchBox: FC<Props> = ({ updateText }) => {
  const [text, setText] = useState('');

  const clickHandler = () => {
    updateText(text);
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="講座検索"
        className="rounded-l-md border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="button" clickHandler={clickHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          fill="white"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </Button>
    </div>
  );
};
