import { StudentHeader } from '@/components/organisms/Header';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StudentHeader />
      <main>{children}</main>
    </>
  );
}