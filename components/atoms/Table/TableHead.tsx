type Props = {
  children: React.ReactNode;
};

export const TableHead: React.FC<Props> = ({ children }) => {
  return <thead className="bg-blue-400 font-bold">{children}</thead>;
};
