"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center max-w-md">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-serif text-3xl font-bold mb-4">Giỏ Hàng Trống</h1>
            <p className="text-muted-foreground mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Link href="/products">
              <Button size="lg">Khám Phá Sản Phẩm</Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Giỏ Hàng ({items.length} sản phẩm)</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                if (!item) return;
                const price: any = item?.product.salePrice || item?.product.price
                return (
                  <Card key={`${item.productId}-${item.size}-${item.color}`} className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link href={`/products/${item.productId}`} className="relative w-24 h-32 flex-shrink-0">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg?height=128&width=96"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.productId}`}>
                          <h3 className="font-semibold text-lg mb-1 hover:text-accent transition-colors line-clamp-1">
                            {item.product.name}
                          </h3>
                        </Link>

                        <div className="text-sm text-muted-foreground space-y-1 mb-3">
                          <p>Size: {item.size}</p>
                          <p>Màu: {item.color}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.productId, item.size, item.color, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.productId, item.size, item.color, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-bold text-lg">{(price * item.quantity).toLocaleString("vi-VN")}₫</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.id, item.productId, item.size, item.color)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Xóa
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="font-serif text-2xl font-bold mb-6">Tổng Đơn Hàng</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span className="font-medium">{totalPrice.toLocaleString("vi-VN")}₫</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span className="font-medium">Miễn phí</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-lg">Tổng cộng</span>
                      <span className="font-bold text-2xl">{totalPrice.toLocaleString("vi-VN")}₫</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full mb-3">
                    Thanh Toán
                  </Button>
                </Link>

                <Link href="/products">
                  <Button size="lg" variant="outline" className="w-full bg-transparent">
                    Tiếp Tục Mua Sắm
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
