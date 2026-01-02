import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { UserProvider } from "@/lib/user-context"
import NextTopLoader from "nextjs-toploader"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <NextTopLoader
        color="#171717"
        height={3}
        showSpinner={true}
      />
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 bg-secondary/30">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  )
}
