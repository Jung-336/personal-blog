import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { Post } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PostHeaderProps {
  post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="mb-10">
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href={`/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            {post.category}
          </Link>
          <span>•</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{post.title}</h1>

        <p className="text-xl text-muted-foreground">{post.excerpt}</p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <div className="font-medium">{post.author.name}</div>
          <div className="text-sm text-muted-foreground">{post.author.title}</div>
        </div>
      </div>

      <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
      </div>
    </div>
  )
}
