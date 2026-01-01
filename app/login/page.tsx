"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
      if (!res.ok) {
        throw new Error("Đăng nhập thất bại! Kiểm tra lại email hoặc mật khẩu.")
      }

      const data = await res.json()
      console.log("✅ Login response:", data)

      // Lưu token và thông tin người dùng
      localStorage.setItem("access_token", data.data.access_token)
      localStorage.setItem("token_expire", (Date.now() + data.data.expires_in * 1000).toString());
      localStorage.setItem("user_info", JSON.stringify(data.data.user))

      // Điều hướng dựa trên quyền (role)
      if (data.data.user.role === "admin" || data.data.user.email === "admin@minh.vn") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } catch (err) {
      console.error("❌ Login error:", err)
      alert("Đăng nhập thất bại. Vui lòng thử lại!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.credential
        })
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('access_token', data.token);
        localStorage.setItem("token_expire", (Date.now() + data.token_expire * 1000).toString());
        localStorage.setItem("user_info", JSON.stringify(data.user))
        setUser(data.user);
        router.push("/")
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Đăng nhập thất bại!');
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-serif text-center">Đăng Nhập</CardTitle>
              <CardDescription className="text-center">
                Nhập thông tin để truy cập tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Link href="/forget-password" className="text-sm text-accent hover:underline">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
                </Button>
              </form>

              <div className="mt-4">
                <div className="relative my-2">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => alert('Đăng nhập thất bại')}
                    size="large"
                    theme="outline"
                    text="signin_with"
                  />
                </div>
              </div>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Chưa có tài khoản? </span>
                <Link href="/register" className="text-accent hover:underline font-medium">
                  Đăng ký ngay
                </Link>
              </div>

              <div className="mt-4 text-center text-xs text-muted-foreground">
                <p>Demo: admin@minh.vn để truy cập trang quản trị</p>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </GoogleOAuthProvider>
  )
}
