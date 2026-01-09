import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full p-8 text-center">
          <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />

          <h1 className="font-serif text-3xl font-bold mb-4">Đặt Hàng Thành Công!</h1>

          <p className="text-muted-foreground mb-6">
            Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn hàng của bạn và sẽ xử lý trong thời gian sớm nhất.
          </p>

          <p className="text-sm text-muted-foreground mb-6">
            Thông tin chi tiết đơn hàng đã được gửi đến email của bạn. Bạn có thể theo dõi trạng thái đơn hàng trong tài
            khoản của mình.
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/products">
              <Button size="lg" className="w-full">
                Tiếp Tục Mua Sắm
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full bg-transparent">
                Về Trang Chủ
              </Button>
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
