"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { items } = useCart()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    const user = localStorage.getItem("user_info")

    // SỬA LỖI TẠI ĐÂY: Kiểm tra kỹ giá trị trước khi Parse
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user)
        console.log(parsedUser);
        setUserInfo(parsedUser)
        setIsLoggedIn(true)
      } catch (err) {
        console.error("❌ Error parsing user info:", err)
        // Nếu dữ liệu trong LocalStorage bị lỗi JSON, xóa luôn để tránh lỗi lặp lại
        localStorage.removeItem("user_info")
        setIsLoggedIn(false)
      }
    } else {
      setIsLoggedIn(false)
      setUserInfo(null)
    }
  }, [])

  // Hàm Đăng xuất dùng chung cho cả Desktop và Mobile
  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("token_expire")
    localStorage.removeItem("user_info")

    // Reset state để giao diện cập nhật ngay
    setIsLoggedIn(false)
    setUserInfo(null)
    setShowUserMenu(false)
    setMobileMenuOpen(false)

    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="font-serif text-2xl md:text-3xl font-bold tracking-tight">MINH</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
              Trang Chủ
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-accent transition-colors">
              Sản Phẩm
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
              Về Chúng Tôi
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
              Liên Hệ
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>

            {isLoggedIn ? (
              <div className="relative hidden md:block">
                <div
                  className="flex gap-[8px] items-center cursor-pointer"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-gray-100 cursor-pointer"
                  >
                    {userInfo?.picture ? <img src={userInfo?.picture} className="overflow-hidden rounded-full"/> : <User className="h-5 w-5" />}
                  </Button>
                  <span>{userInfo?.fullName || userInfo?.name || ""}</span>
                </div>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-[100]">
                    <div className="p-4 border-b">
                      {/* Dùng Optional Chaining và dự phòng cho cả fullName/name */}
                      <p className="font-semibold text-sm truncate">
                        {userInfo?.fullName || userInfo?.name || "Người dùng"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{userInfo?.email}</p>
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
            ) : (
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Trang Chủ
              </Link>
              <Link href="/products" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Sản Phẩm
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/account" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Tài Khoản ({userInfo?.fullName || userInfo?.name})
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-left text-red-600"
                  >
                    Đăng Xuất
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Đăng Nhập
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}