"use client"

import type React from "react"

import { useState, useEffect } from "react" // <-- Thêm useEffect
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import ImageUploadInput from "@/components/ui/upload"

// import { Select } from "react-day-picker" // <-- Xóa hoặc thay đổi nếu bạn dùng Select tùy chỉnh khác

// Định nghĩa kiểu dữ liệu cho Danh mục (nếu bạn dùng TypeScript)
interface Category {
  id: string // Hoặc number, tùy thuộc vào backend của bạn
  name: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1. STATE MỚI: Danh sách danh mục từ API
  const [categories, setCategories] = useState<Category[]>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true) // State loading

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    category: "", // Sẽ lưu ID hoặc name của danh mục đã chọn
    sizes: "",
    colors: "",
    stock: "",
    featured: false,
    imageUrl: "",
  })

  // 2. EFFECT: Gọi API để lấy danh sách Danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Lấy token từ localStorage nếu cần thiết cho API của bạn
        // const token = localStorage.getItem("access_token");

        setIsCategoriesLoading(true)
        const res = await fetch("http://localhost:8080/categories", { // <-- Thay đổi URL API này nếu cần
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`, // Nếu API cần xác thực
          },
        })

        if (!res.ok) {
          throw new Error("Không thể tải danh mục")
        }

        // Giả sử API trả về dạng { data: Category[] } hoặc trực tiếp Category[]
        const data = await res.json()

        // Kiểm tra và xử lý cấu trúc dữ liệu trả về từ API
        const categoryList: Category[] = Array.isArray(data) ? data : (data.data || []);

        setCategories(categoryList)
        console.log("✅ Categories loaded:", categoryList)
      } catch (err) {
        console.error("❌ Lỗi khi tải danh mục:", err)
        // Hiển thị lỗi cho người dùng nếu cần
      } finally {
        setIsCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, []) // Chỉ chạy một lần khi component được mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Chuẩn bị dữ liệu để gửi lên backend
      const productData = {
        name: formData.name,
        description: formData.description,
        // Chuyển đổi giá trị string sang number
        price: Number.parseFloat(formData.price),
        // Gửi null/undefined tùy theo backend của bạn. Dùng null sẽ tường minh hơn trong JSON.
        salePrice: formData.salePrice ? Number.parseFloat(formData.salePrice) : null,
        stock: Number.parseInt(formData.stock),
        // Chuyển đổi chuỗi phân cách bằng dấu phẩy thành mảng
        sizes: formData.sizes.split(",").map((s) => s.trim()).filter(s => s), // Lọc bỏ khoảng trắng rỗng
        colors: formData.colors.split(",").map((c) => c.trim()).filter(c => c),
        // Sử dụng category ID đã chọn
        category: formData.category,
        // Gửi mảng images (giả sử backend chấp nhận mảng object hoặc chuỗi URL)
        // Thay thế bằng cấu trúc phù hợp với API của bạn (ví dụ: `images: [{ url: formData.imageUrl }]` hoặc `mainImage: formData.imageUrl`)
        images: formData.imageUrl ? [formData.imageUrl] : [],
        featured: formData.featured,
      }

      console.log("Create product:", productData)

      // 2. Lấy Token xác thực
      const token = localStorage.getItem("access_token");

      // Kiểm tra token nếu API yêu cầu xác thực
      if (!token) {
        alert("Lỗi xác thực. Vui lòng đăng nhập lại.");
        throw new Error("Missing access token for product creation.");
      }

      // 3. Gọi API POST để tạo sản phẩm mới
      const res = await fetch("http://localhost:8080/products/", { // <-- URL API tạo sản phẩm
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // <-- Gửi token xác thực
        },
        body: JSON.stringify(productData),
      })

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Lỗi phản hồi API:", errorData);
        throw new Error(errorData.message || res.statusText || "Tạo sản phẩm thất bại!");
      }

      // const data = await res.json() // Nếu bạn cần phản hồi từ backend
      // console.log("✅ Product created successfully:", data)

      alert("Sản phẩm đã được tạo thành công!")
      router.push("/admin/products") // Điều hướng sau khi thành công

    } catch (err) {
      console.error("❌ Lỗi khi tạo sản phẩm:", err)
      alert(`Tạo sản phẩm thất bại. Chi tiết: ${(err as Error).message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Thay thế Select bằng thẻ <select> HTML và map dữ liệu categories
  const CategorySelect = () => (
    <select
      id="category"
      value={formData.category}
      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      required
      // Thêm disabled nếu đang load
      disabled={isCategoriesLoading}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" // Thêm lại styling cơ bản của input/select
    >
      <option value="" disabled>
        {isCategoriesLoading ? "Đang tải danh mục..." : "-- Chọn Danh mục --"}
      </option>

      {categories.map((cat) => (
        // Sử dụng cat.id (hoặc slug/tên tùy theo backend) làm value
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  )


  return (
    <div className="space-y-6">
      {/* ... (Phần tiêu đề và Button quay lại) */}
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Thêm Sản Phẩm Mới</h1>
          <p className="text-muted-foreground">Tạo sản phẩm mới cho cửa hàng</p>
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
                {/* ... (Tên sản phẩm và Mô tả) */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Tên sản phẩm *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Mô tả *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                {/* THAY THẾ SELECT CŨ BẰNG COMPONENT MỚI */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="category">Danh mục *</Label>
                  <CategorySelect />
                </div>
              </CardContent>
            </Card>

            {/* ... (Phần Giá & Tồn Kho) */}
            <Card>
              <CardHeader>
                <CardTitle>Giá & Tồn Kho</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="price">Giá gốc (₫) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="salePrice">Giá khuyến mãi (₫)</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      value={formData.salePrice}
                      onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
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

            {/* ... (Phần Biến Thể) */}
            <Card>
              <CardHeader>
                <CardTitle>Biến Thể</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="sizes">Kích thước *</Label>
                  <Input
                    id="sizes"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="S, M, L, XL (phân cách bằng dấu phẩy)"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">Nhập các size, phân cách bằng dấu phẩy</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="colors">Màu sắc *</Label>
                  <Input
                    id="colors"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    placeholder="Đen, Trắng, Xanh (phân cách bằng dấu phẩy)"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">Nhập các màu, phân cách bằng dấu phẩy</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ... (Phần Hình ảnh & Cài đặt) */}
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
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : "Tạo Sản Phẩm"}
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