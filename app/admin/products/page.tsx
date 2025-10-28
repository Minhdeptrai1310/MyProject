"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"

export default function AdminProductsPage() {
  const [products] = useState(mockProducts)

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      // TODO: Implement delete functionality with your backend
      console.log("Delete product:", id)
      alert("Chức năng xóa sẽ được kết nối với backend của bạn")
    }
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
                        {product.salePrice && (
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
                        <Link href={`/products/${product.id}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
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
        </CardContent>
      </Card>
    </div>
  )
}
