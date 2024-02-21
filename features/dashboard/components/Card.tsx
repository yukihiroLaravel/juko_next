interface Props {
  children: React.ReactNode;
  color?: string;
}

export default function Card({ children, color = 'bg-[#FFFDE9]' }: Props) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-[#FFFDE9] p-4 shadow-md sm:flex-row">
      {children}
    </div>
  );
}
