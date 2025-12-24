"use client";

import { UserDropDownUI } from "./UserDropDown.ui"

export function UserDropDown() {
  const handleLogout = () => {
    console.log("logout")
  }

  return (
    <UserDropDownUI
      userName="山田 花子"
      onLogout={handleLogout}
    />
  )
}
