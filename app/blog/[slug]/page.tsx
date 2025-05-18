import { BlogContent } from "@/components/blog-content"
import { CommentSection } from "@/components/comment-section"
import { PostHeader } from "@/components/post-header"
import { RelatedPosts } from "@/components/related-posts"
import { ShareButtons } from "@/components/share-buttons"
import { getPostBySlug, getRelatedPosts } from "@/lib/posts"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.id, post.tags)

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <PostHeader post={post} />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-16 order-2 md:order-1">
            <div className="md:sticky md:top-24 flex md:flex-col items-center gap-4">
              <ShareButtons post={post} />
            </div>
          </div>

          <div className="flex-1 order-1 md:order-2">
            <BlogContent content={post.content} />

            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/tag/${tag}`}
                    className="px-3 py-1 bg-secondary/50 hover:bg-secondary text-secondary-foreground rounded-full text-sm transition-colors"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="max-w-4xl mx-auto mt-16">
        <CommentSection postId={post.id} />
      </div>

      {relatedPosts.length > 0 && (
        <div className="max-w-4xl mx-auto mt-16">
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}
    </div>
  )
}
