import Link from 'next/link';
import React from 'react';

type HeaderUIProps = {
  children?: React.ReactNode;
};

export function HeaderUI({ children }: HeaderUIProps) {
  return (
    <header className="border-b bg-primary">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-[#FBF459]">
          受講管理アプリ
        </Link>
        {children}
      </div>
    </header>
  );
}
