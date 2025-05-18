import { PostEditor } from "@/components/admin/post-editor"
import { AdminHeader } from "@/components/admin/header"
import type { Metadata } from "next"
import { getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"

interface EditPostPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Edit Post | Admin Dashboard",
  description: "Edit an existing blog post",
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  // In a real app, you would fetch the post by ID
  // For this example, we'll use the mock data
  const posts = await getPostBySlug("understanding-transformer-architecture")

  if (!posts) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
        <PostEditor isEditing={true} postId={params.id} />
      </div>
    </div>
  )
}
