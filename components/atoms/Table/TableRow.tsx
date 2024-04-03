type Props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLTableRowElement>;
};

export const TableRow: React.FC<Props> = ({ children, onClick }) => {
  return <tr onClick={onClick}>{children}</tr>;
};
