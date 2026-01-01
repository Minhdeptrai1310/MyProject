import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2">Cài Đặt</h1>
        <p className="text-muted-foreground">Quản lý cài đặt cửa hàng</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông Tin Cửa Hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="storeName">Tên cửa hàng</Label>
              <Input id="storeName" defaultValue="Minh Fashion" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="storeEmail">Email</Label>
              <Input id="storeEmail" type="email" defaultValue="contact@minh.vn" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="storePhone">Số điện thoại</Label>
              <Input id="storePhone" type="tel" defaultValue="0123 456 789" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="storeAddress">Địa chỉ</Label>
              <Input id="storeAddress" defaultValue="123 Đường ABC, Quận 1, TP.HCM" />
            </div>

            <Button>Lưu Thay Đổi</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cài Đặt Thanh Toán</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="bankName">Tên ngân hàng</Label>
              <Input id="bankName" placeholder="Vietcombank" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="bankAccount">Số tài khoản</Label>
              <Input id="bankAccount" placeholder="1234567890" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="accountHolder">Chủ tài khoản</Label>
              <Input id="accountHolder" placeholder="NGUYEN VAN A" />
            </div>

            <Button>Lưu Thay Đổi</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cài Đặt Giao Hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="shippingFee">Phí vận chuyển mặc định (₫)</Label>
              <Input id="shippingFee" type="number" defaultValue="0" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="freeShippingThreshold">Miễn phí vận chuyển từ (₫)</Label>
              <Input id="freeShippingThreshold" type="number" defaultValue="500000" />
            </div>

            <Button>Lưu Thay Đổi</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông Báo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="emailNotifications">Email thông báo đơn hàng</Label>
              <Input id="emailNotifications" type="email" defaultValue="admin@minh.vn" />
            </div>

            <Button>Lưu Thay Đổi</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
