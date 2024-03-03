import { FC } from 'react';

type Props = {
  children: any;
};
export const SideBar: FC<Props> = ({ children }) => {
  return (
    <aside
      className="relative hidden w-1/5 shrink-0 border-r-[1px] border-[#000000] md:block"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto rounded px-3 py-4">{children}</div>
    </aside>
  );
};
