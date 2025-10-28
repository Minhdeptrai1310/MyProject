"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()

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
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/login" className="hidden md:block">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

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
              <Link
                href="/"
                className="text-sm font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang Chủ
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sản Phẩm
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Về Chúng Tôi
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Liên Hệ
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Đăng Nhập
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
