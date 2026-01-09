"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminDashboardPage() {
  // Mock data - replace with real data from your backend
  const stats = [
    {
      title: "Tổng Doanh Thu",
      value: "125,000,000₫",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Đơn Hàng",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Sản Phẩm",
      value: "48",
      change: "+4",
      trend: "up",
      icon: Package,
    },
    {
      title: "Khách Hàng",
      value: "892",
      change: "+15.3%",
      trend: "up",
      icon: Users,
    },
  ]

  const [orders, setOrders] = useState<any>([])
  const getAllOrder = async () => {
    try {
      const res = await fetch('http://localhost:8080/order/', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      if (res.ok && data.success)
        setOrders(data.data);
    } catch {
      throw new Error('Loi Server!')
    }
  }

  useEffect(() => {
    getAllOrder();
  }, [])

  console.log("All Orders: ", orders);

  const handleStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING_PAYMENT":
        return "Chờ thanh toán"
      case "PAYMENT_CONFIRMED":
        return "Đã xác nhận thanh toán"
      case "PROCESSING":
        return "Đang xử lý"
      case "SHIPPING":
        return "Đang giao"
      case "SHIPPED":
        return "Đã giao"
      case "COMPLETED":
        return "Hoàn thành"
      case "CANCELLED":
        return "Đã hủy"
      case "EXPIRED":
        return "Hết hạn"
      default:
        return "Không xác định"
    }
  }

  const handleStatusBadgeColor = (status: string) => {
    switch (status) {
      case "PENDING_PAYMENT":
        return "yellow"
      case "PAYMENT_CONFIRMED":
        return "blue"
      case "PROCESSING":
        return "gray"
      case "SHIPPING":
        return "blue"
      case "SHIPPED":
        return "green"
      case "COMPLETED":
        return "gray"
      case "CANCELLED":
        return "red"
      case "EXPIRED":
        return "red"
      default:
        return "gray"
    }
  }
  const recentOrders = orders.slice(0, 5).map((order: any) => ({
    id: order.orderCode,
    customer: order.user_info.name,
    total: order.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    status: handleStatusBadge(order.status),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2">Tổng Quan</h1>
        <p className="text-muted-foreground">Chào mừng trở lại! Đây là tổng quan về cửa hàng của bạn.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="flex items-center text-sm">
                  <TrendIcon className={`h-4 w-4 mr-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Đơn Hàng Gần Đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-right mr-8">
                  <p className="font-semibold">{order.total}</p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-${handleStatusBadgeColor(order.status)}-100 text-${handleStatusBadgeColor(order.status)}-800`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
