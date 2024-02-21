type Props = {
  children: React.ReactNode;
};

export const TableHead: React.FC<Props> = ({ children }) => {
  return <thead className="bg-gray-200">{children}</thead>;
};
