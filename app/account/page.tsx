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

interface UserInfo {
  id: string
  name: string
  email: string
  phone: string
  role: "customer" | "admin"
  createdAt?: string
}

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<UserInfo>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      router.push("/login")
      return
    }

    // Lấy thông tin người dùng từ localStorage
    const userInfo = localStorage.getItem("user_info")
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo)
        setUser(parsedUser)
        setEditData(parsedUser)
      } catch (err) {
        console.error("Lỗi parse user info:", err)
        router.push("/login")
      }
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("token_expire")
    localStorage.removeItem("user_info")
    router.push("/login")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      const token = localStorage.getItem("access_token")
      if (!token) {
        setMessage({ type: "error", text: "Token không hợp lệ. Vui lòng đăng nhập lại." })
        return
      }

      const res = await fetch(`http://localhost:8080/users/${user?.id}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editData.name,
          phone: editData.phone,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Cập nhật thất bại")
      }

      const data = await res.json()
      if (!data.success)
        throw new Error("Cập nhật thất bại")

      setUser(data.data)
      localStorage.setItem("user_info", JSON.stringify(data.data))
      setMessage({ type: "success", text: "Cập nhật thông tin thành công!" })
      setIsEditing(false)
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Có lỗi xảy ra",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Không tìm thấy thông tin người dùng</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/login">
                <Button className="w-full">Quay lại đăng nhập</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-serif mb-2">Thông tin tài khoản</h1>
            <p className="text-gray-600">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
          </div>

          {/* Message Alert */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <h3 className="text-lg font-semibold text-center">{user.name}</h3>
                    <p className="text-sm text-gray-500 text-center mt-1">
                      {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className="w-full"
                  >
                    {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin"}
                  </Button>
                  <Button onClick={handleLogout} variant="destructive" className="w-full">
                    Đăng xuất
                  </Button>
                </CardContent>
              </Card>

              {/* Account Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-base">Thống kê</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Tài khoản được tạo</p>
                    <p className="font-semibold">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    <p className="font-semibold text-green-600">Đang hoạt động</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>
                    {isEditing ? "Chỉnh sửa thông tin của bạn" : "Xem thông tin tài khoản"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <Label htmlFor="name" className="text-base mb-2 block">
                        Họ và tên
                      </Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          name="name"
                          value={editData.name || ""}
                          onChange={handleInputChange}
                          className="text-base"
                        />
                      ) : (
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-base">{user.name}</p>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="text-base mb-2 block">
                        Email
                      </Label>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="text-base text-gray-600">{user.email}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Email không thể thay đổi</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone" className="text-base mb-2 block">
                        Số điện thoại
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          name="phone"
                          value={editData.phone || ""}
                          onChange={handleInputChange}
                          placeholder="Nhập số điện thoại"
                          className="text-base"
                        />
                      ) : (
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-base">{user.phone || "Chưa cập nhật"}</p>
                        </div>
                      )}
                    </div>

                    {/* Role */}
                    <div>
                      <Label className="text-base mb-2 block">Loại tài khoản</Label>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="text-base">
                          {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                      <div className="pt-6 border-t flex gap-4">
                        <Button
                          onClick={handleSaveChanges}
                          disabled={isSaving}
                          className="flex-1"
                        >
                          {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(false)
                            setEditData(user)
                          }}
                          variant="outline"
                          className="flex-1"
                        >
                          Hủy
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Security Section */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Bảo mật</CardTitle>
                  <CardDescription>Quản lý mật khẩu và bảo mật tài khoản</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/account/change-password">
                    <Button variant="outline" className="w-full">
                      Đổi mật khẩu
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
