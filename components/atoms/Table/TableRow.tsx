type Props = {
  children: React.ReactNode;
};

export const TableRow: React.FC<Props> = ({ children }) => {
  return <tr>{children}</tr>;
};
