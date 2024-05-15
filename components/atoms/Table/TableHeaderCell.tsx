type Props = {
  children: React.ReactNode;
};

export const TableHeaderCell: React.FC<Props> = ({ children }) => {
  return <th className="px-4 py-2">{children}</th>;
};
