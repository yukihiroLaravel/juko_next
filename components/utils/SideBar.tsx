import { FC } from 'react';

type Props = {
  children: any;
};
export const SideBar: FC<Props> = ({ children }) => {
  return (
    <aside className="shrink-0 w-1/5 relative border-[#000000] border-r-[1px]" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">{children}</div>
    </aside>
  );
};
