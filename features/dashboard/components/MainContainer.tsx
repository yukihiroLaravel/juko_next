interface Props {
  children: React.ReactNode;
}

export default function MainContainer({ children }: Props) {
  return <div className="mx-auto flex w-4/5 flex-col gap-5">{children}</div>;
}
