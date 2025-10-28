import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function AdminCustomersPage() {
  // Mock data - replace with real data from your backend
  const customers = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      orders: 5,
      totalSpent: "3,250,000₫",
      joinDate: "2024-12-01",
    },
    {
      id: "2",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      orders: 3,
      totalSpent: "1,850,000₫",
      joinDate: "2024-12-15",
    },
    {
      id: "3",
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0369852147",
      orders: 8,
      totalSpent: "5,100,000₫",
      joinDate: "2024-11-20",
    },
    {
      id: "4",
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0147258369",
      orders: 2,
      totalSpent: "950,000₫",
      joinDate: "2025-01-05",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Khách Hàng</h1>
          <p className="text-muted-foreground">Quản lý thông tin khách hàng</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Khách Hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Tên khách hàng</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Số điện thoại</th>
                  <th className="text-left py-3 px-4 font-semibold">Đơn hàng</th>
                  <th className="text-left py-3 px-4 font-semibold">Tổng chi tiêu</th>
                  <th className="text-left py-3 px-4 font-semibold">Ngày tham gia</th>
                  <th className="text-left py-3 px-4 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{customer.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{customer.email}</td>
                    <td className="py-3 px-4">{customer.phone}</td>
                    <td className="py-3 px-4">{customer.orders}</td>
                    <td className="py-3 px-4 font-semibold">{customer.totalSpent}</td>
                    <td className="py-3 px-4 text-muted-foreground">{customer.joinDate}</td>
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
