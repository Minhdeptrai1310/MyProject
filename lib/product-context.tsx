"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { ProductItem } from "./types"

interface ProductContextType {
    items: ProductItem[]
    loading: boolean
    getProductById: (value: string) => ProductItem | undefined
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<ProductItem[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const getAllProduct = async () => {
        setLoading(true);
        const res = await fetch("http://localhost:8080/products/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!res.ok) {
            throw new Error("Không thể tải danh sách sản phẩm")
        }

        const data = await res.json()
        const productsData = Array.isArray(data) ? data : data?.products ?? data?.data ?? []

        setItems((prev) => [...productsData])
        setLoading(false);
    }
    useEffect(() => {
        getAllProduct();
    }, [])

    const getProductById = (id: string) => {
        return items.find(item => item.id === id);
    }

    return (
        <ProductContext.Provider
            value={{
                items,
                loading,
                getProductById
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export function useProduct() {
    const context = useContext(ProductContext)
    if (context === undefined) {
        throw new Error("useProduct must be used within a ProductProvider")
    }
    return context
}
