"use client"

import { useState, use, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/lib/mock-data"
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react"
import { notFound, useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { addItem } = useCart()

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    let mounted = true

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError("")

        const res = await fetch(`http://localhost:8080/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error("Không thể tải thông tin sản phẩm")
        }

        const data = await res.json()
        if (mounted) {
          setProduct(data.data)
        }
      } catch (err) {
        console.error("❌ Fetch product error:", err)
        if (mounted) {
          // Fallback to mock data
          const mockProduct = mockProducts.find((p) => p.id === id)
          if (mockProduct) {
            setProduct(mockProduct)
            setError("")
          } else {
            setError("Không tìm thấy sản phẩm")
          }
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      mounted = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Đang tải thông tin sản phẩm...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    notFound()
  }

  const hasDiscount = product.salePrice && product.salePrice < product.price
  const displayPrice = product.salePrice || product.price

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Vui lòng chọn size và màu sắc")
      return
    }

    addItem(product.id, selectedSize, selectedColor, quantity)
    alert("Đã thêm vào giỏ hàng!")
  }
  console.log(product);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images[0] || "/placeholder.svg?height=800&width=600"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {hasDiscount && (
                  <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-base px-3 py-1 text-[#111113] font-bold">
                    -{Math.round(((product.price - displayPrice) / product.price) * 100)}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                <div className="flex items-center gap-3 mb-4">
                  {hasDiscount && (
                    <span className="text-xl text-muted-foreground line-through">
                      {product.price.toLocaleString("vi-VN")}₫
                    </span>
                  )}
                  <span className="font-bold text-3xl">{displayPrice.toLocaleString("vi-VN")}₫</span>
                </div>

                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block font-semibold mb-3">Kích thước</label>
                <div className="flex flex-wrap gap-2">
                  {(product.sizes || []).map((size: string) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[60px]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block font-semibold mb-3">Màu sắc</label>
                <div className="flex flex-wrap gap-2">
                  {(product.colors || []).map((color: string) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block font-semibold mb-3">Số lượng</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground ml-2">Còn {product.stock} sản phẩm</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Thêm Vào Giỏ
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mã sản phẩm:</span>
                  <span className="font-medium">{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tình trạng:</span>
                  <span className="font-medium text-green-600">Còn hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
