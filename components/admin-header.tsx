"use client"

import { Bell, LogOut, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from "@/lib/user-context"
import Link from "next/link"
import { useState } from "react"

export function AdminHeader() {
  const { user, logOut } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setShowUserMenu(false)
    logOut()
  }

  return (
    <header className="bg-card border-b sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm..." className="pl-10" />
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full" />
          </Button>

          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              {user?.name?.slice(0, 1)}
            </div>
          </div>
          {showUserMenu && (
            <div className="absolute top-[100%] right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-[100]">
              <div className="p-4 border-b">
                {/* Dùng Optional Chaining và dự phòng cho cả fullName/name */}
                <p className="font-semibold text-sm truncate">
                  {user?.fullName || user?.name || "Người dùng"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <div className="py-2">
                <Link href="/account" onClick={() => setShowUserMenu(false)}>
                  <div className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Tài khoản của tôi
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
