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
  productId: string
  product: Product
  quantity: number
  size: string
  color: string
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
