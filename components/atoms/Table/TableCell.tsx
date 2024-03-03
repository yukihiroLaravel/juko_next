type Props = {
  children: React.ReactNode;
};

export const TableCell: React.FC<Props> = ({ children }) => {
  return <td className="px-4 py-2">{children}</td>;
};
