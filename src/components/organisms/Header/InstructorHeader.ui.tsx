'use client';

import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/atoms/DropdownMenu';
import { HeaderUI } from './Header.ui';

type InstructorHeaderUIProps = {
  userName: string;
  onLogout: () => void;
};

export function InstructorHeaderUI({
  userName,
  onLogout,
}: InstructorHeaderUIProps) {
  return (
    <HeaderUI>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">{userName}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            {/* TODO: 講師用ユーザー情報編集URL */}
            <Link href="#">ユーザー情報編集</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout}>ログアウト</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </HeaderUI>
  );
}
