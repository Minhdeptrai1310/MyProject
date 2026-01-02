"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/lib/user-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    note: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("MONEY_TRANSFER")

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center max-w-md">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-serif text-3xl font-bold mb-4">Giỏ Hàng Trống</h1>
            <p className="text-muted-foreground mb-8">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
            <Link href="/products">
              <Button size="lg">Khám Phá Sản Phẩm</Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(() => true)
    // TODO: Implement actual order submission to your backend
    const orderData = {
      items,
      shippingAddress: formData,
      paymentMethod,
      total: totalPrice,
      createdAt: new Date(),
    }

    console.log("Order submitted:", orderData)
    // Simulate API call
    try {

      const res = await fetch('http://localhost:8080/order/check-out', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          paymentMethod: paymentMethod,
          address: formData.address
        })
      })
  
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error('Thanh toan loi!');
      }
  
      router.refresh();
    } catch {
      throw new Error('Loi Server!');
    } finally {
      setIsProcessing(() => false);
    }
  }

  const shippingFee: number = 0
  const total: number = totalPrice + shippingFee

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Thanh Toán</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Shipping Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Thông Tin Giao Hàng</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <Label htmlFor="fullName">Họ và tên *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                      <Label htmlFor="address">Địa chỉ *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Số nhà, tên đường"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="ward">Phường/Xã *</Label>
                      <Input
                        id="ward"
                        value={formData.ward}
                        onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="district">Quận/Huyện *</Label>
                      <Input
                        id="district"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        required
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                      <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                      <Label htmlFor="note">Ghi chú đơn hàng</Label>
                      <Input
                        id="note"
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Phương Thức Thanh Toán</h2>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg mb-3">
                      <RadioGroupItem value="MONEY_TRANSFER" id="MONEY_TRANSFER" />
                      <Label htmlFor="MONEY_TRANSFER" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Thanh toán khi nhận hàng (COD)</div>
                        <div className="text-sm text-muted-foreground">Thanh toán bằng tiền mặt khi nhận hàng</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg mb-3">
                      <RadioGroupItem value="BANK_TRANSFER" id="BANK_TRANSFER" />
                      <Label htmlFor="BANK_TRANSFER" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Chuyển khoản ngân hàng</div>
                        <div className="text-sm text-muted-foreground">
                          Chuyển khoản trực tiếp đến tài khoản ngân hàng
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="momo" id="momo" />
                      <Label htmlFor="momo" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Ví MoMo</div>
                        <div className="text-sm text-muted-foreground">Thanh toán qua ví điện tử MoMo</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24">
                  <h2 className="font-serif text-2xl font-bold mb-6">Đơn Hàng</h2>

                  <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                    {items.map((item) => {
                      const price: any = item?.product.salePrice || item?.product.price
                      return item && (
                        <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                          <div className="relative w-16 h-20 flex-shrink-0">
                            <Image
                              src={item.product.images[0] || "/placeholder.svg?height=80&width=64"}
                              alt={item.product.name}
                              fill
                              className="object-cover rounded"
                            />
                            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {item.size} / {item.color}
                            </p>
                            <p className="font-semibold text-sm mt-1">
                              {(price * item.quantity).toLocaleString("vi-VN")}₫
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="space-y-3 border-t pt-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tạm tính</span>
                      <span className="font-medium">{totalPrice.toLocaleString("vi-VN")}₫</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Phí vận chuyển</span>
                      <span className="font-medium">
                        {shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString("vi-VN")}₫`}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-lg">Tổng cộng</span>
                        <span className="font-bold text-2xl">{total.toLocaleString("vi-VN")}₫</span>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                    {isProcessing ? "Đang xử lý..." : "Đặt Hàng"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Bằng việc đặt hàng, bạn đồng ý với các điều khoản và điều kiện của chúng tôi
                  </p>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
