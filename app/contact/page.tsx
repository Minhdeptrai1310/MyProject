"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Facebook, Globe } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error("Vui lòng điền tất cả các trường thông tin")
      }

      // In real application, you would send this to your backend
      console.log("Form submitted:", formData)

      setMessage({ type: "success", text: "Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại sớm." })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Có lỗi xảy ra",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold font-serif mb-4">Liên Hệ Với Chúng Tôi</h1>
            <p className="text-lg text-gray-600">
              Hãy gửi cho chúng tôi tin nhắn, chúng tôi sẽ trả lời sớm nhất có thể
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Information Cards */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Email</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:iamminhhtran13102003@gmail.com"
                  className="text-blue-600 hover:text-blue-800 break-all"
                >
                  iamminhhtran13102003@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Số Điện Thoại</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a href="tel:0917998376" className="text-green-600 hover:text-green-800 font-semibold">
                  0919 798 376
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">Địa Chỉ</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Phương Đình Công, Quận Hoàng Mai
                  <br />
                  Hà Nội
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Gửi Tin Nhắn</CardTitle>
                <CardDescription>Điền form dưới đây để gửi tin nhắn cho chúng tôi</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {message && (
                    <div
                      className={`p-4 rounded-lg ${
                        message.type === "success"
                          ? "bg-green-50 border border-green-200 text-green-800"
                          : "bg-red-50 border border-red-200 text-red-800"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-base mb-2 block">
                      Họ và Tên
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập tên của bạn"
                      className="text-base"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-base mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập email của bạn"
                      className="text-base"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject" className="text-base mb-2 block">
                      Chủ Đề
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Nhập chủ đề tin nhắn"
                      className="text-base"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-base mb-2 block">
                      Tin Nhắn
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Nhập nội dung tin nhắn"
                      className="text-base min-h-32"
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Đang gửi..." : "Gửi Tin Nhắn"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Kinh Doanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Về MINH</h3>
                  <p className="text-gray-700">
                    MINH là cửa hàng thời trang cao cấp chuyên cung cấp quần áo phong cách, chất lượng vượt trội với
                    dịch vụ khách hàng tuyệt vời.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Giờ Làm Việc</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      <span className="font-medium">Thứ 2 - Thứ 6:</span> 9:00 - 18:00
                    </li>
                    <li>
                      <span className="font-medium">Thứ 7:</span> 9:00 - 17:00
                    </li>
                    <li>
                      <span className="font-medium">Chủ nhật:</span> Nghỉ
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Kết Nối Với Chúng Tôi</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/people/Minh-Tr%E1%BA%A7n/100012916268741/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                    </a>
                    <a
                      href="mailto:iamminhhtran13102003@gmail.com"
                      className="p-3 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-red-600" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Google Map Placeholder */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Vị Trí</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">
                    Phương Đình Công, Quận Hoàng Mai, Hà Nội
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    (Google Maps sẽ được tích hợp sau)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
