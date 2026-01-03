'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, CheckIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminOrdersPage() {
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

  const getStatusBadge = (status: string) => {
    const statusMap = {
      PENDING_PAYMENT: {
        label: "Chờ thanh toán",
        variant: "outline" as const,
      },
      PAYMENT_CONFIRMED: {
        label: "Đã xác nhận thanh toán",
        variant: "secondary" as const,
      },
      PROCESSING: {
        label: "Đang xử lý",
        variant: "default" as const,
      },
      SHIPPING: {
        label: "Đang giao",
        variant: "secondary" as const,
      },
      SHIPPED: {
        label: "Đã giao",
        variant: "outline" as const,
      },
      COMPLETED: {
        label: "Hoàn thành",
        variant: "default" as const,
      },
      CANCELLED: {
        label: "Đã hủy",
        variant: "destructive" as const,
      },
      EXPIRED: {
        label: "Hết hạn",
        variant: "destructive" as const,
      },
    }
    const statusInfo = statusMap[status as keyof typeof statusMap]
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  const confirmPayment = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/order/${id}/confirm_payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      if (res.ok && data.success) {
        getAllOrder();
      }
      else alert('Xac nhan that bai');
    }
    catch {
      alert('Loi server');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Đơn Hàng</h1>
          <p className="text-muted-foreground">Quản lý tất cả đơn hàng của cửa hàng</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Đơn Hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Mã đơn</th>
                  <th className="text-left py-3 px-4 font-semibold">Khách hàng</th>
                  <th className="text-left py-3 px-4 font-semibold">Ngày đặt</th>
                  <th className="text-left py-3 px-4 font-semibold">Số lượng</th>
                  <th className="text-left py-3 px-4 font-semibold">Tổng tiền</th>
                  <th className="text-left py-3 px-4 font-semibold">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{order.orderCode}</td>
                    <td className="py-3 px-4">{order.user_info.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.createdAt}</td>
                    <td className="py-3 px-4">{order.orderItems.length} sản phẩm</td>
                    <td className="py-3 px-4 font-semibold">{order.totalAmount}</td>
                    <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                    <td className="py-3 px-4">
                      {order.status === "PENDING_PAYMENT" && (
                        <Button variant="default" size="sm" onClick={() => confirmPayment(order.id)}>
                          <CheckIcon className="h-4 w-4 mr-1" />
                          {`Xác nhận thanh toán`}
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Xem
                      </Button>
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
