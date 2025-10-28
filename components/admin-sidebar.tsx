"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Tổng Quan",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Sản Phẩm",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Đơn Hàng",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Khách Hàng",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Cài Đặt",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r min-h-screen flex flex-col">
      <div className="p-6 border-b">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="font-serif text-2xl font-bold">MINH</div>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">Quản Trị Viên</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Đăng Xuất</span>
        </Link>
      </div>
    </aside>
  )
}
