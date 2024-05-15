type Props = {
  children: React.ReactNode;
};

export const TableBody: React.FC<Props> = ({ children }) => {
  return <tbody>{children}</tbody>;
};
