import { BlogPostCard } from "@/components/blog-post-card"
import { FeaturedPost } from "@/components/featured-post"
import { SearchBar } from "@/components/search-bar"
import { TagCloud } from "@/components/tag-cloud"
import { getPosts } from "@/lib/posts"

export default async function Home() {
  const posts = await getPosts()
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground font-heading">
              Bruce.AI
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl">
              Exploring the frontiers of artificial intelligence and machine learning
            </p>
          </div>
          <SearchBar />
        </div>

        {featuredPost && <FeaturedPost post={featuredPost} />}
      </section>

      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <a href="/blog" className="text-primary hover:text-primary/80 transition-colors">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Machine Learning",
              "Large Language Models",
              "Neural Networks",
              "Computer Vision",
              "Reinforcement Learning",
              "Generative AI",
            ].map((category) => (
              <a
                key={category}
                href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <p className="text-muted-foreground">Explore articles about {category.toLowerCase()}</p>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Popular Tags</h2>
          <div className="p-6 rounded-lg border border-border bg-card/50">
            <TagCloud />
          </div>
        </div>
      </section>
    </div>
  )
}
