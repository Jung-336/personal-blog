import { PostEditor } from "@/components/admin/post-editor"
import { AdminHeader } from "@/components/admin/header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Post | Admin Dashboard",
  description: "Create a new blog post",
}

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
        <PostEditor />
      </div>
    </div>
  )
}
