"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem } from "./types"
import { useProduct } from "./product-context"
import { useUser } from "./user-context"

interface CartContextType {
  items: CartItem[]
  addItem: (productId: string, size: string, color: string, quantity: number) => void
  removeItem: (id: string, productId: string, size: string, color: string) => void
  updateQuantity: (id: string, productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { getProductById, items: productItems } = useProduct();
  const { user } = useUser();

  const getAllCartByUserId = async () => {
    const res = await fetch(`http://localhost:8080/cart/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) {
      throw new Error("Không thể tải danh sách sản phẩm")
    }

    const data = await res.json()
    const cartData = Array.isArray(data) ? data : data?.data ?? []
    const cartDatas = cartData.map((data: any) => {
      const product = getProductById(data.productId);
      if (!product) return;
      data.product = product;
      return data;
    })
    setItems(() => [...cartDatas]);
  }
  useEffect(() => {
    if (user)
      getAllCartByUserId();
  }, [user, productItems])

  const addItem = async (productId: string, size: string, color: string, quantity: number) => {
    const product = getProductById(productId);
    if (!product) return

    const res = await fetch('http://localhost:8080/cart/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        productId,
        size,
        color,
        quantity
      })
    })
    if (res.ok) {
      getAllCartByUserId();
    }
  }

  const removeItem = async (id: string, productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size && item.color === color)),
    )
    const res = await fetch(`http://localhost:8080/cart/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
      getAllCartByUserId();
    }
  }

  const updateQuantity = async (id: string, productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, productId, size, color)
      return
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size && item.color === color ? { ...item, quantity } : item,
      ),
    )

    const res = await fetch(`http://localhost:8080/cart/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        productId,
        size,
        color,
        quantity
      })
    })
    if (res.ok) {
      getAllCartByUserId();
    }
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item?.quantity, 0)
  const totalPrice = items.reduce((sum, item) => {
    const price = item?.product.salePrice || item?.product.price
    return sum + Number(price) * item?.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
