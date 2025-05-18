import { AdminDashboard } from "@/components/admin/dashboard"
import { AdminHeader } from "@/components/admin/header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | AI & Machine Learning Blog",
  description: "Manage your blog posts, comments, and settings",
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />
      <AdminDashboard />
    </div>
  )
}
