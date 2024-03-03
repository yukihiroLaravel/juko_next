type Props = {
  children: React.ReactNode;
};

export const TableHead: React.FC<Props> = ({ children }) => {
  return <thead className="bg-primary text-white">{children}</thead>;
};
