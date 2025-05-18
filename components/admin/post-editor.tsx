"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bold, Italic, Underline, List, ListOrdered, ImageIcon, Link, Code, Youtube } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface PostEditorProps {
  isEditing?: boolean
  postId?: string
}

export function PostEditor({ isEditing = false, postId }: PostEditorProps) {
  const [post, setPost] = useState({
    title: isEditing ? "Understanding Transformer Architecture" : "",
    slug: isEditing ? "understanding-transformer-architecture" : "",
    excerpt: isEditing
      ? "A deep dive into the transformer architecture that powers modern language models like GPT and BERT, explaining the key components and mechanisms."
      : "",
    content: isEditing
      ? "<p>This is the full content of the blog post that would be loaded from the database when editing an existing post...</p>"
      : "",
    category: isEditing ? "large-language-models" : "",
    tags: isEditing ? "transformers, attention, nlp, deep-learning" : "",
    coverImage: isEditing ? "/placeholder.svg?height=600&width=1200" : "",
    status: isEditing ? "published" : "draft",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "title" && !post.slug) {
      // Auto-generate slug from title
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setPost({ ...post, title: value, slug })
    } else {
      setPost({ ...post, [name]: value })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setPost({ ...post, [name]: value })
  }

  const handleSave = (status: "draft" | "published") => {
    // In a real application, this would save to a database
    setPost({ ...post, status })

    toast({
      title: isEditing
        ? `Post ${status === "published" ? "updated and published" : "updated as draft"}`
        : `Post ${status === "published" ? "published" : "saved as draft"}`,
      description: `"${post.title}" has been ${isEditing ? "updated" : status === "published" ? "published" : "saved as draft"}.`,
    })
  }

  const handleEditorAction = (action: string) => {
    // In a real application, this would modify the editor content
    console.log(`Editor action: ${action}`)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={post.title} onChange={handleChange} placeholder="Enter post title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" value={post.slug} onChange={handleChange} placeholder="enter-post-slug" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={post.excerpt}
              onChange={handleChange}
              placeholder="Brief summary of the post"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <div className="border rounded-md">
              <div className="flex items-center p-2 border-b">
                <div className="flex items-center space-x-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditorAction("bold")}
                  >
                    <Bold className="h-4 w-4" />
                    <span className="sr-only">Bold</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditorAction("italic")}
                  >
                    <Italic className="h-4 w-4" />
                    <span className="sr-only">Italic</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditorAction("underline")}
                  >
                    <Underline className="h-4 w-4" />
                    <span className="sr-only">Underline</span>
                  </Button>
                </div>
                <div className="flex items-center space-x-1 ml-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditorAction("list")}
                  >
                    <List className="h-4 w-4" />
                    <span className="sr-only">Bullet List</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditorAction("orderedList")}
                  >
                    <ListOrdered className="h-4 w-4" />
                    <span className="sr-only">Numbered List</span>
                  </Button>
                </div>
                <div className="flex items-center space-x-1 ml-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditorAction("image")}
                  >
                    <ImageIcon className="h-4 w-4" />
                    <span className="sr-only">Insert Image</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditorAction("link")}
                  >
                    <Link className="h-4 w-4" />
                    <span className="sr-only">Insert Link</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditorAction("code")}
                  >
                    <Code className="h-4 w-4" />
                    <span className="sr-only">Insert Code</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditorAction("youtube")}
                  >
                    <Youtube className="h-4 w-4" />
                    <span className="sr-only">Insert YouTube</span>
                  </Button>
                </div>
              </div>
              <Textarea
                id="content"
                name="content"
                value={post.content}
                onChange={handleChange}
                placeholder="Write your post content here..."
                className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                rows={15}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-6 p-6 border rounded-md">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={post.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={post.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="machine-learning">Machine Learning</SelectItem>
                  <SelectItem value="large-language-models">Large Language Models</SelectItem>
                  <SelectItem value="neural-networks">Neural Networks</SelectItem>
                  <SelectItem value="computer-vision">Computer Vision</SelectItem>
                  <SelectItem value="reinforcement-learning">Reinforcement Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" name="tags" value={post.tags} onChange={handleChange} placeholder="tag1, tag2, tag3" />
              <p className="text-xs text-muted-foreground">Separate tags with commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <Input
                id="coverImage"
                name="coverImage"
                value={post.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-muted-foreground">Enter image URL or upload</p>
              <Button type="button" variant="outline" size="sm" className="mt-2">
                <ImageIcon className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Button type="button" onClick={() => handleSave("published")}>
              {isEditing ? "Update & Publish" : "Publish"}
            </Button>
            <Button type="button" variant="outline" onClick={() => handleSave("draft")}>
              {isEditing ? "Update as Draft" : "Save as Draft"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
