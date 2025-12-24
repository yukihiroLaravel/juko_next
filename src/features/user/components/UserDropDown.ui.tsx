"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

type UserDropDownUIProps = {
  userName: string
  onLogout: () => void
}

export function UserDropDownUI({
  userName,
  onLogout,
}: UserDropDownUIProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          {userName}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="#">
            ユーザー情報編集
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onLogout}>
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
