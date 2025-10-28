import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

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

  const recentOrders = [
    { id: "#MH12345", customer: "Nguyễn Văn A", total: "1,250,000₫", status: "Đang xử lý" },
    { id: "#MH12344", customer: "Trần Thị B", total: "850,000₫", status: "Đã giao" },
    { id: "#MH12343", customer: "Lê Văn C", total: "2,100,000₫", status: "Đang giao" },
    { id: "#MH12342", customer: "Phạm Thị D", total: "650,000₫", status: "Đã giao" },
  ]

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
            {recentOrders.map((order) => (
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
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Đã giao"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Đang giao"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
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
