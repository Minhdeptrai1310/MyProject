"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react"
import { useUser } from "@/lib/user-context"

export default function ChangePasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const { user } = useUser();
  // Kiểm tra quyền truy cập: Nếu không có token thì về trang login
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      router.push("/login")
      return
    }
    setIsLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Validation cơ bản tại Client
    if (formData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Mật khẩu mới phải có ít nhất 6 ký tự." })
      return
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu xác nhận không khớp." })
      return
    }

    setIsSaving(true)

    try {
      const token = localStorage.getItem("access_token")
      
      const res = await fetch(`http://localhost:8080/auth/${user.id}/change_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: formData.currentPassword,
          new_password: formData.newPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        // Lấy thông báo lỗi từ cấu trúc errorResponse của bạn
        throw new Error(data.detail?.message || data.message || "Đổi mật khẩu thất bại")
      }

      setMessage({ type: "success", text: "Đổi mật khẩu thành công! Đang đăng xuất..." })
      
      // Xóa localStorage và quay về login sau 2 giây
      setTimeout(() => {
        localStorage.clear()
        router.push("/login")
      }, 2000)

    } catch (err: any) {
      setMessage({ type: "error", text: err.message })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-4">
          <Link href="/account" className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại tài khoản
          </Link>
          
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-serif">Đổi Mật Khẩu</CardTitle>
              </div>
              <CardDescription>Cập nhật mật khẩu định kỳ để bảo vệ tài khoản của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              {message && (
                <div className={`mb-4 p-3 rounded-md text-sm border ${
                  message.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
                }`}>
                  {message.text}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <Input id="currentPassword" name="currentPassword" type="password" placeholder="••••••••" required value={formData.currentPassword} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input id="newPassword" name="newPassword" type="password" placeholder="Tối thiểu 6 ký tự" required value={formData.newPassword} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu mới" required value={formData.confirmPassword} onChange={handleInputChange} />
                </div>
                <Button type="submit" className="w-full mt-2" disabled={isSaving}>
                  {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang cập nhật...</> : "Xác nhận đổi mật khẩu"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}