"use client"

import { useState, useEffect } from "react" // <-- Thêm useEffect
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
// import { mockProducts } from "@/lib/mock-data" // <-- Loại bỏ mock data
import Image from "next/image"
import Link from "next/link"

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: string
  name: string
  category: string // Giả sử category là chuỗi (tên hoặc ID)
  price: number
  salePrice?: number | null
  stock: number
  featured: boolean
  images: string[] // Mảng URL hình ảnh
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 1. CHỨC NĂNG LẤY DỮ LIỆU SẢN PHẨM
  const fetchProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Lấy token từ localStorage (nếu API cần xác thực)
      const token = localStorage.getItem("access_token") 
      
      const res = await fetch("http://localhost:8080/products/", { // <-- URL API lấy tất cả sản phẩm
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }), // Thêm Auth header nếu có token
        },
      })

      if (!res.ok) {
        throw new Error("Không thể tải danh sách sản phẩm")
      }

      const responseData = await res.json()
      
      // Giả sử API trả về dữ liệu sản phẩm trong trường 'data'
      // Tùy chỉnh dòng này dựa trên cấu trúc JSON thực tế của backend
      const productList: Product[] = responseData.data || responseData; 
      
      setProducts(productList)
      console.log("✅ Products loaded:", productList.length)
    } catch (err) {
      console.error("❌ Lỗi khi tải sản phẩm:", err)
      setError(`Lỗi: ${(err as Error).message}. Vui lòng kiểm tra server.`)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Gọi API khi component được mount
  useEffect(() => {
    fetchProducts()
  }, []) // Dependency rỗng chỉ chạy một lần

  // 2. CHỨC NĂNG XÓA SẢN PHẨM
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này? Thao tác này không thể hoàn tác.")) {
      return
    }

    try {
      const token = localStorage.getItem("access_token")
      if (!token) {
        alert("Lỗi xác thực. Vui lòng đăng nhập lại.")
        return
      }

      const res = await fetch(`http://localhost:8080/products/${id}`, { // <-- URL API xóa sản phẩm
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // <-- Gửi token xác thực
        },
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || res.statusText || "Xóa sản phẩm thất bại!")
      }

      // Cập nhật state local: Lọc bỏ sản phẩm đã xóa
      setProducts(products.filter(p => p.id !== id))
      alert(`Sản phẩm ID: ${id} đã được xóa thành công!`)
      
      // Hoặc gọi lại fetchProducts() nếu cần làm mới toàn bộ danh sách từ server:
      // fetchProducts(); 
      
    } catch (err) {
      console.error("❌ Lỗi khi xóa sản phẩm:", err)
      alert(`Xóa sản phẩm thất bại. Chi tiết: ${(err as Error).message}`)
    }
  }

  // Hiển thị trạng thái loading và error
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="font-serif text-3xl font-bold">Sản Phẩm</h1>
        <Card className="p-8 text-center">Đang tải danh sách sản phẩm...</Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="font-serif text-3xl font-bold">Sản Phẩm</h1>
        <Card className="p-8 text-center text-red-500">{error}</Card>
      </div>
    )
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Sản Phẩm</h1>
          <p className="text-muted-foreground">Quản lý sản phẩm của cửa hàng</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Thêm Sản Phẩm
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Sản Phẩm ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
             <div className="text-center p-6 text-muted-foreground">
                Chưa có sản phẩm nào. Hãy thêm sản phẩm mới.
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Sản phẩm</th>
                    <th className="text-left py-3 px-4 font-semibold">Danh mục</th>
                    <th className="text-left py-3 px-4 font-semibold">Giá</th>
                    <th className="text-left py-3 px-4 font-semibold">Tồn kho</th>
                    <th className="text-left py-3 px-4 font-semibold">Trạng thái</th>
                    <th className="text-left py-3 px-4 font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              // Chú ý: Backend của bạn có thể trả về trường images là một mảng chuỗi
                              src={product.images[0] || "/placeholder.svg?height=48&width=48"}
                              alt={product.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">
                        <div>
                          {(product.salePrice && product.salePrice < product.price) && (
                            <p className="text-sm text-muted-foreground line-through">
                              {product.price.toLocaleString("vi-VN")}₫
                            </p>
                          )}
                          <p className="font-semibold">{(product.salePrice || product.price).toLocaleString("vi-VN")}₫</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={product.stock > 10 ? "text-green-600" : "text-red-600"}>{product.stock}</span>
                      </td>
                      <td className="py-3 px-4">
                        {product.featured ? <Badge>Nổi bật</Badge> : <Badge variant="outline">Thường</Badge>}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/products/${product.id}`} target="_blank">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          {/* Sửa onClick để gọi hàm handleDelete đã được triển khai */}
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}