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

type StudentHeaderUIProps = {
  userName: string;
  onLogout: () => void;
};

export function StudentHeaderUI({ userName, onLogout }: StudentHeaderUIProps) {
  return (
    <HeaderUI>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">{userName}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="#">ユーザー情報編集</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout}>ログアウト</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </HeaderUI>
  );
}
