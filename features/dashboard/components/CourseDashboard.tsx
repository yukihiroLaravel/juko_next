interface Props {
  children: React.ReactNode;
}

export default function CourseDashboard({ children }: Props) {
  return <div className="size-full">{children}</div>;
}
