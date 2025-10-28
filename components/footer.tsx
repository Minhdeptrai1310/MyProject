import Link from "next/link"
import { Facebook, Instagram, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">MINH</h3>
            <p className="text-sm text-primary-foreground/80">Thời trang cao cấp, phong cách sang trọng</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liên Kết</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-secondary transition-colors">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="hover:text-secondary transition-colors">
                  Chính Sách Giao Hàng
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-secondary transition-colors">
                  Đổi Trả Hàng
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-secondary transition-colors">
                  Câu Hỏi Thường Gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Liên Hệ</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@minh.vn</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 Minh Fashion. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
