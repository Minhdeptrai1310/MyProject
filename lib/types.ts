// User types
export interface User {
  id: string
  email: string
  fullName: string
  phone: string
  role: "customer" | "admin"
  createdAt: Date
}

// Product types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice?: number
  category: string
  sizes: string[]
  colors: string[]
  images: string[]
  stock: number
  featured: boolean
  createdAt: Date
}

// Cart types
export interface CartItem {
  id: string
  productId: string
  product: ProductItem
  quantity: number
  size: string
  color: string
}

export interface ProductItem {
  id: string
  name: string
  price: string
  salePrice: string
  category: string
  sizes: string[]
  colors: string[]
  stock: number
  images: string[]
}

// Order types
export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  paymentMethod: string
  createdAt: Date
}

export interface Address {
  fullName: string
  phone: string
  address: string
  city: string
  district: string
  ward: string
}
