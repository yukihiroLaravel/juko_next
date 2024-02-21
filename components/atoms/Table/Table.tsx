type Props = {
  children: React.ReactNode;
};

export const Table: React.FC<Props> = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">{children}</table>
    </div>
  );
};
