type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const TableRow: React.FC<Props> = ({ children, onClick }) => {
  return <tr onClick={onClick}>{children}</tr>;
};
