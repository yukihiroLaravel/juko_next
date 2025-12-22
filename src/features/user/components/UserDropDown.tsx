"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export function UserDropDown() {
  const handleLogout = () => {
    console.log("logout")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          山田 花子
        </Button>
      </DropdownMenuTrigger>

      {/* ドロップダウンの中身 */}
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="#">
            ユーザー情報編集
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout}>
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}