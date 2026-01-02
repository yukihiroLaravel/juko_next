import { GuestHeader } from '@/components/organisms/Header';

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GuestHeader />
      <main>{children}</main>
    </>
  );
}
