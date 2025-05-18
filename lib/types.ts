export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  author: {
    name: string
    title: string
    avatar?: string
  }
  category: string
  tags: string[]
  readingTime: number
}
