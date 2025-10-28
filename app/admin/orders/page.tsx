import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function AdminOrdersPage() {
  // Mock data - replace with real data from your backend
  const orders = [
    {
      id: "#MH12345",
      customer: "Nguyễn Văn A",
      date: "2025-01-15",
      total: "1,250,000₫",
      status: "processing",
      items: 3,
    },
    {
      id: "#MH12344",
      customer: "Trần Thị B",
      date: "2025-01-14",
      total: "850,000₫",
      status: "delivered",
      items: 2,
    },
    {
      id: "#MH12343",
      customer: "Lê Văn C",
      date: "2025-01-14",
      total: "2,100,000₫",
      status: "shipping",
      items: 5,
    },
    {
      id: "#MH12342",
      customer: "Phạm Thị D",
      date: "2025-01-13",
      total: "650,000₫",
      status: "delivered",
      items: 1,
    },
    {
      id: "#MH12341",
      customer: "Hoàng Văn E",
      date: "2025-01-13",
      total: "1,800,000₫",
      status: "processing",
      items: 4,
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = {
      processing: { label: "Đang xử lý", variant: "default" as const },
      shipping: { label: "Đang giao", variant: "secondary" as const },
      delivered: { label: "Đã giao", variant: "outline" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const },
    }
    const statusInfo = statusMap[status as keyof typeof statusMap]
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
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
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                    <td className="py-3 px-4">{order.items} sản phẩm</td>
                    <td className="py-3 px-4 font-semibold">{order.total}</td>
                    <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                    <td className="py-3 px-4">
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
