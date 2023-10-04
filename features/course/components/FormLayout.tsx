type Props = {
  children: React.ReactNode;
};
export const FormLayout: React.FC<Props> = ({ children }) => {
  return <div className="md:border md:w-3/6 min-h-[80vh] my-10 bg-white mx-auto">{children}</div>;
};
