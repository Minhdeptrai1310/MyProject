"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem } from "./types"
import { mockProducts } from "./mock-data"

interface CartContextType {
  items: CartItem[]
  addItem: (productId: string, size: string, color: string, quantity: number) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    // them dieu kien get theo user
    const savedCart = localStorage.getItem("minh-cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // if else theo user trong localstorage userinfo
    // check id user if exist thi save theo id user
    localStorage.setItem("minh-cart___{id}", JSON.stringify(items))
  }, [items])

  const addItem = (productId: string, size: string, color: string, quantity: number) => {
    const product = mockProducts.find((p) => p.id === productId)
    if (!product) return

    setItems((prev) => {
      const existingItem = prev.find(
        (item) => item.productId === productId && item.size === size && item.color === color,
      )

      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...prev, { productId, product, size, color, quantity }]
    })
  }

  const removeItem = (productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size && item.color === color)),
    )
  }

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size, color)
      return
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size && item.color === color ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price
    return sum + price * item.quantity
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
