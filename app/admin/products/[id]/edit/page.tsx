"use client"

import type React from "react"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { mockProducts } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const product = mockProducts.find((p) => p.id === id)

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!product) {
    notFound()
  }

  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    salePrice: product.salePrice?.toString() || "",
    category: product.category,
    sizes: product.sizes.join(", "),
    colors: product.colors.join(", "),
    stock: product.stock.toString(),
    featured: product.featured,
    imageUrl: product.images[0] || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement actual product update with your backend
    const productData = {
      id,
      ...formData,
      price: Number.parseFloat(formData.price),
      salePrice: formData.salePrice ? Number.parseFloat(formData.salePrice) : undefined,
      stock: Number.parseInt(formData.stock),
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      colors: formData.colors.split(",").map((c) => c.trim()),
      images: formData.imageUrl ? [formData.imageUrl] : [],
    }

    console.log("Update product:", productData)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Sản phẩm đã được cập nhật! (Kết nối với backend để lưu thực tế)")
      router.push("/admin/products")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Chỉnh Sửa Sản Phẩm</h1>
          <p className="text-muted-foreground">Cập nhật thông tin sản phẩm</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Cơ Bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên sản phẩm *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Mô tả *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Danh mục *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Giá & Tồn Kho</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Giá gốc (₫) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="salePrice">Giá khuyến mãi (₫)</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      value={formData.salePrice}
                      onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="stock">Số lượng tồn kho *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Biến Thể</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sizes">Kích thước *</Label>
                  <Input
                    id="sizes"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">Nhập các size, phân cách bằng dấu phẩy</p>
                </div>

                <div>
                  <Label htmlFor="colors">Màu sắc *</Label>
                  <Input
                    id="colors"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">Nhập các màu, phân cách bằng dấu phẩy</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hình Ảnh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="imageUrl">URL hình ảnh</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  />
                </div>

                {formData.imageUrl && (
                  <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                    <img
                      src={formData.imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài Đặt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured">Sản phẩm nổi bật</Label>
                    <p className="text-sm text-muted-foreground">Hiển thị trên trang chủ</p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : "Cập Nhật Sản Phẩm"}
              </Button>
              <Link href="/admin/products" className="block">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Hủy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
