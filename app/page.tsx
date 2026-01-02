"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ArrowRight } from "lucide-react"
import { useProduct } from "@/lib/product-context"

export default function HomePage() {
  const { items } = useProduct();
  console.log(items);
  
  const featuredProducts = items.filter((p) => p.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center bg-secondary">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              Phong Cách Sang Trọng
              <br />
              Chất Lượng Vượt Trội
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Khám phá bộ sưu tập thời trang cao cấp, thiết kế tinh tế dành cho những người yêu thích sự hoàn hảo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="text-base">
                  Khám Phá Ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-base bg-transparent">
                  Về Chúng Tôi
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Sản Phẩm Nổi Bật</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Những sản phẩm được yêu thích nhất từ bộ sưu tập của chúng tôi
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  Xem Tất Cả Sản Phẩm
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Danh Mục Sản Phẩm</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tìm kiếm theo danh mục để dễ dàng lựa chọn phong cách phù hợp
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {["Áo Sơ Mi", "Quần", "Áo Thun", "Áo Vest"].map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-muted hover:shadow-lg transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-white group-hover:scale-110 transition-transform">
                      {category}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Tại Sao Chọn Minh?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-xl mb-2">Chất Lượng Cao Cấp</h3>
                <p className="text-muted-foreground">
                  Sản phẩm được tuyển chọn kỹ lưỡng, chất liệu cao cấp, bền đẹp theo thời gian
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-xl mb-2">Giao Hàng Nhanh Chóng</h3>
                <p className="text-muted-foreground">
                  Giao hàng toàn quốc, nhanh chóng và đảm bảo an toàn cho sản phẩm
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-xl mb-2">Hỗ Trợ Tận Tâm</h3>
                <p className="text-muted-foreground">Đội ngũ chăm sóc khách hàng chuyên nghiệp, sẵn sàng hỗ trợ 24/7</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
