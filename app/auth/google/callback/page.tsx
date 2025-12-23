"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function GoogleCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)

      const access_token = params.get("access_token")
      const expires_in = params.get("expires_in")
      const userParam = params.get("user")
      const error = params.get("error")

      if (error) {
        const msg = { type: "oauth:google:error", message: error }
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(msg, window.location.origin)
          window.close()
          return
        }
        alert("Google OAuth error: " + error)
        router.push("/login")
        return
      }

      let user = null
      if (userParam) {
        try {
          // Backend may send user as encoded JSON in query param
          user = JSON.parse(decodeURIComponent(userParam))
        } catch (e) {
          console.warn("Failed to parse user param", e)
          user = null
        }
      }

      if (access_token) {
        const payload = {
          type: "oauth:google:success",
          access_token,
          expires_in: expires_in ? Number(expires_in) : 0,
          user,
        }

        // If opened as a popup, message the opener and close
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(payload, window.location.origin)
          // give opener a moment to handle message, then close
          setTimeout(() => window.close(), 500)
          return
        }

        // If not a popup (direct navigation), store and redirect
        localStorage.setItem("access_token", access_token)
        if (expires_in) {
          localStorage.setItem("token_expire", (Date.now() + Number(expires_in) * 1000).toString())
        }
        if (user) localStorage.setItem("user_info", JSON.stringify(user))

        // redirect to homepage
        router.push("/")
        return
      }

      // If we reach here, missing params
      console.warn("No access_token in callback URL")
      router.push("/login")
    } catch (err) {
      console.error(err)
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm">Đang hoàn tất đăng nhập bằng Google…</p>
      </div>
    </div>
  )
}
