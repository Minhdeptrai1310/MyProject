import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Minh - Thời Trang Cao Cấp",
  description: "Cửa hàng thời trang Minh - Phong cách sang trọng, chất lượng vượt trội",
    generator: 'Minh.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body 
      className={`${inter.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning={true}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
