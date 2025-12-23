"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Target, Users, Award, ShoppingBag, Zap } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: "Chất Lượng",
      description: "Chọn lọc sản phẩm cẩn thận để mang lại giá trị thực cho khách hàng",
    },
    {
      icon: Target,
      title: "Tập Trung",
      description: "Tập trung vào trải nghiệm người dùng và những thiết kế phù hợp với xu hướng",
    },
    {
      icon: Users,
      title: "Linh Hoạt",
      description: "Đội ngũ nhỏ, phản ứng nhanh và lắng nghe phản hồi từ khách hàng",
    },
    {
      icon: Award,
      title: "Minh Bạch",
      description: "Giá cả rõ ràng, chính sách đổi trả đơn giản cho giai đoạn đầu",
    },
  ]

  const stats = [
    { number: "50+", label: "Sản Phẩm" },
    { number: "500+", label: "Khách Hàng" },
    { number: "1", label: "Năm Hoạt Động" },
    { number: "95%", label: "Hài Lòng" },
  ]

  const timeline = [
    {
      year: "2024",
      title: "Ý Tưởng & Thiết Kế",
      description: "Bắt đầu từ một nhóm nhỏ với ý tưởng tạo ra thời trang tối giản, chất lượng",
    },
    {
      year: "2025",
      title: "Ra Mắt Thương Hiệu",
      description: "Tung bộ sưu tập đầu tiên và xây dựng cộng đồng khách hàng đầu tiên",
    },
    {
      year: "2025+",
      title: "Mở Rộng",
      description: "Từng bước mở rộng danh mục sản phẩm và hoàn thiện hệ thống bán hàng trực tuyến",
    },
  ]

  const teamMembers = [
    {
      name: "Trần Quang Minh",
      role: "Người Sáng Lập",
      description:
        "Là người khởi xướng dự án — đam mê thời trang và công nghệ. Hiện tập trung vào phát triển sản phẩm và trải nghiệm khách hàng.",
      skills: ["Thiết kế sản phẩm", "Next.js", "Chiến lược sản phẩm"],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Startup Tone */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white to-blue-50">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Chúng Tôi Là Một Startup Thời Trang</h1>
            <p className="text-lg text-gray-700 mb-6">
              MINH bắt đầu từ một ý tưởng đơn giản: mang đến trang phục tối giản, tiện dụng và
              chất lượng cho những người bận rộn. Chúng tôi là một đội ngũ nhỏ, liên tục thử nghiệm
              và cải tiến dựa trên phản hồi thực tế từ khách hàng.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/products">
                <Button size="lg">Khám Phá BST Đầu Tiên</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">Hỗ Trợ Early Customers</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Lean Stats */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{stat.number}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values - Startup mentality */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Những Giá Trị Chúng Tôi Tin Tưởng</h2>
              <p className="text-gray-600">Từ sự khiêm tốn trong thiết kế đến phản hồi nhanh chóng</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Short Timeline */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Hành Trình Ngắn Gọn</h2>
              <p className="text-gray-600">Những bước đầu chúng tôi đã thực hiện</p>
            </div>

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white">{index + 1}</div>
                  <div>
                    <p className="font-semibold">{item.title} <span className="text-sm text-gray-500">• {item.year}</span></p>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex gap-6 items-center">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                  {((member.name || "").split(" ").filter(Boolean).map(n => (n.charAt(0) || "").toUpperCase()).slice(0,2).join("") || ((member.name || "").charAt(0) || "").toUpperCase() || "M")}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                  <p className="text-gray-700 text-sm">{member.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {member.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision (Startup Focus) */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Target className="h-4 w-4 text-blue-600"/> Sứ Mệnh</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">Tạo ra sản phẩm thực sự hữu ích — dễ mặc, dễ phối và bền bỉ. Luôn lắng nghe khách hàng và cải tiến nhanh.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Zap className="h-4 w-4 text-indigo-600"/> Tầm Nhìn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">Trở thành thương hiệu được tin tưởng trong cộng đồng local và mở rộng dần ra các thị trường lân cận trong 2-3 năm tới.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA for Early Adopters */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Bạn Muốn Tham Gia Hỗ Trợ Chúng Tôi Phát Triển?</h2>
            <p className="text-sm text-blue-100 mb-6">Đăng ký sớm để nhận ưu đãi, thử nghiệm sản phẩm mới và góp ý trực tiếp cho đội ngũ.</p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Trở Thành Early Adopter</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white">
                <Link href="/products">Xem Sản Phẩm</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
