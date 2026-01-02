"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // <-- Thêm Select
import ImageUploadInput from "@/components/ui/upload"
import { use } from "react"
// --- Định nghĩa Interface ---

interface Category {
  id: string
  name: string
  // Thêm các trường khác nếu cần (ví dụ: slug)
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice: number | null
  category: string // Đây là Category ID
  sizes: string[]
  colors: string[]
  stock: number
  featured: boolean
  images: string[]
}

interface FormData {
  name: string
  description: string
  price: string
  salePrice: string
  category: string // Đây là ID của danh mục đã chọn
  sizes: string
  colors: string
  stock: string
  featured: boolean
  imageUrl: string
}

const initialFormData: FormData = {
  name: "",
  description: "",
  price: "0",
  salePrice: "",
  category: "",
  sizes: "",
  colors: "",
  stock: "0",
  featured: false,
  imageUrl: "",
}

// --- Component Chính ---

export default function EditProductPage({ params }: any) {

  const { id } = use(params) as any;
  const router = useRouter()

  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 1. CHỨC NĂNG TẢI DỮ LIỆU BAN ĐẦU (Sản phẩm & Danh mục)
  const fetchInitialData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem("access_token")
      const headers = {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      }

      // --- 1a. Tải chi tiết Sản phẩm ---
      const productRes = await fetch(`http://localhost:8080/products/${id}`, { headers })
      if (productRes.status === 404) {
        notFound()
      }
      if (!productRes.ok) {
        throw new Error("Không thể tải chi tiết sản phẩm")
      }
      const productData = (await productRes.json()).data as Product // Giả định có trường .data

      // --- 1b. Tải danh sách Danh mục ---
      const categoryRes = await fetch("http://localhost:8080/categories", { headers })
      if (!categoryRes.ok) {
        throw new Error("Không thể tải danh sách danh mục")
      }
      const categoryData = (await categoryRes.json()).data as Category[] // Giả định có trường .data
      setCategories(categoryData || [])

      // Khởi tạo state của form với dữ liệu sản phẩm
      setFormData({
        name: productData.name,
        description: productData.description,
        price: productData.price.toString(),
        salePrice: productData.salePrice?.toString() || "",
        category: productData.category, // Đây là ID danh mục của sản phẩm
        sizes: productData.sizes.join(", "),
        colors: productData.colors.join(", "),
        stock: productData.stock.toString(),
        featured: productData.featured,
        imageUrl: productData.images[0] || "",
      })

    } catch (err) {
      console.error("❌ Lỗi khi tải dữ liệu:", err)
      setError(`Lỗi: ${(err as Error).message}. Kiểm tra kết nối API.`)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])


  // Xử lý loading và error state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="font-serif text-3xl font-bold">Chỉnh Sửa Sản Phẩm</h1>
        <Card className="p-8 text-center flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Đang tải dữ liệu sản phẩm...
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="font-serif text-3xl font-bold">Chỉnh Sửa Sản Phẩm</h1>
        <Card className="p-8 text-center text-red-500">{error}</Card>
      </div>
    )
  }

  // 2. CHỨC NĂNG CẬP NHẬT SẢN PHẨM (PUT/PATCH)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const productDataToSend = {
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      salePrice: formData.salePrice ? Number.parseFloat(formData.salePrice) : null,
      category: formData.category, // <-- Gửi Category ID đã chọn
      stock: Number.parseInt(formData.stock),
      featured: formData.featured,

      sizes: formData.sizes.split(",").map((s) => s.trim()).filter(s => s.length > 0),
      colors: formData.colors.split(",").map((c) => c.trim()).filter(c => c.length > 0),

      images: formData.imageUrl ? [formData.imageUrl] : [],
    }

    console.log(`Update product data (ID: ${id}) being sent:`, productDataToSend)

    try {
      const token = localStorage.getItem("access_token")
      const res = await fetch(`http://localhost:8080/products/${id}`, {
        method: "PUT", // Sử dụng PUT
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(productDataToSend),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || res.statusText || "Cập nhật sản phẩm thất bại!")
      }

      alert("✅ Sản phẩm đã được cập nhật thành công!")
      router.push("/admin/products")

    } catch (err) {
      console.error("❌ Lỗi khi cập nhật sản phẩm:", err)
      setError(`Cập nhật thất bại: ${(err as Error).message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Xử lý thay đổi form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value, // Lưu Category ID
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      featured: checked,
    }))
  }

  // --- JSX Render ---

  // Tìm tên danh mục hiện tại để hiển thị trong SelectValue
  const currentCategory = categories?.find(cat => cat.id === formData.category);


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
          <p className="text-muted-foreground">ID: {id}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

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
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Mô tả *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* --- SỬA ĐỔI: SELECT BOX DANH MỤC --- */}
                <div>
                  <Label htmlFor="category">Danh mục *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger id="category">
                      {/* Hiển thị tên danh mục hiện tại */}
                      <SelectValue placeholder={currentCategory?.name || "Chọn danh mục"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* Nếu cần debug: <p className="text-sm text-muted-foreground mt-1">ID đã chọn: {formData.category}</p> */}
                </div>
                {/* --- END SỬA ĐỔI --- */}
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
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="salePrice">Giá khuyến mãi (₫)</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      value={formData.salePrice}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="stock">Số lượng tồn kho *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">Nhập các size, phân cách bằng dấu phẩy</p>
                </div>

                <div>
                  <Label htmlFor="colors">Màu sắc *</Label>
                  <Input
                    id="colors"
                    value={formData.colors}
                    onChange={handleInputChange}
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
                <div className="flex flex-col gap-2">
                  <ImageUploadInput
                    fileUrl={formData.imageUrl || ""}
                    onChangeFileUrl={(value) => setFormData({
                      ...formData,
                      imageUrl: value
                    })} />
                </div>
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
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý...
                  </>
                ) : (
                  "Cập Nhật Sản Phẩm"
                )}
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