type Props = {
  children: React.ReactNode;
};
export const FormLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto my-10 min-h-[80vh] bg-white md:w-3/6 md:border">
      {children}
    </div>
  );
};
