import { InstructorHeader } from '@/components/organisms/Header';

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InstructorHeader />
      <main>{children}</main>
    </>
  );
}
