import Link from "next/link"
import { formatDate } from "@/lib/utils"

export function RecentPosts() {
  // In a real application, this would be fetched from an API
  const posts = [
    {
      id: "1",
      title: "Understanding Transformer Architecture",
      slug: "understanding-transformer-architecture",
      date: "2023-05-10T09:00:00Z",
      status: "published",
    },
    {
      id: "2",
      title: "GPT-4: A Deep Dive",
      slug: "gpt-4-deep-dive",
      date: "2023-05-05T14:30:00Z",
      status: "published",
    },
    {
      id: "3",
      title: "The Evolution of Computer Vision",
      slug: "evolution-computer-vision",
      date: "2023-04-28T11:15:00Z",
      status: "published",
    },
    {
      id: "4",
      title: "Reinforcement Learning Basics",
      slug: "reinforcement-learning-basics",
      date: "2023-04-20T16:45:00Z",
      status: "published",
    },
  ]

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex justify-between items-start pb-4 last:pb-0 last:mb-0 last:border-0 border-b border-border"
        >
          <div className="space-y-1">
            <Link href={`/admin/posts/edit/${post.id}`} className="font-medium hover:underline">
              {post.title}
            </Link>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{formatDate(post.date)}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{post.status}</span>
            </div>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
            target="_blank"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  )
}
