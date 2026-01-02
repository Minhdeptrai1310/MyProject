"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product, ProductItem } from "@/lib/types"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  product: Product | ProductItem
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const displayPrice = product.salePrice || product.price

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log({
      productId: product.id,
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1
    })
    addItem(product.id, product.sizes[0], product.colors[0], 1)
  }
  
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={product.images[0] || "/placeholder.svg?height=400&width=300"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[#111113] font-bold">
              -{Math.round(((product.price - displayPrice) / product.price) * 100)}%
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>

        <div className="flex items-center gap-2">
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">{product.price.toLocaleString("vi-VN")}₫</span>
          )}
          <span className="font-bold text-lg">{displayPrice.toLocaleString("vi-VN")}₫</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" onClick={handleQuickAdd}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Thêm Vào Giỏ
        </Button>
      </CardFooter>
    </Card>
  )
}
