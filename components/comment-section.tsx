"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Comment {
  id: string
  name: string
  content: string
  date: string
  likes: number
  dislikes: number
}

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      name: "Alex Kim",
      content:
        "This is a fantastic article! I've been studying LLMs for a while, and your explanation really clarified some concepts for me.",
      date: "2023-05-15T10:30:00Z",
      likes: 5,
      dislikes: 0,
    },
    {
      id: "2",
      name: "Sarah Park",
      content:
        "I appreciate the detailed breakdown of the architecture. Have you considered exploring the ethical implications in a follow-up post?",
      date: "2023-05-16T14:22:00Z",
      likes: 3,
      dislikes: 1,
    },
  ])

  const [newComment, setNewComment] = useState({
    name: "",
    password: "",
    content: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.name.trim() || !newComment.password.trim() || !newComment.content.trim()) {
      return
    }

    const comment: Comment = {
      id: Date.now().toString(),
      name: newComment.name,
      content: newComment.content,
      date: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    }

    setComments([...comments, comment])
    setNewComment({ name: "", password: "", content: "" })
  }

  const handleLike = (id: string) => {
    setComments(comments.map((comment) => (comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment)))
  }

  const handleDislike = (id: string) => {
    setComments(
      comments.map((comment) => (comment.id === id ? { ...comment, dislikes: comment.dislikes + 1 } : comment)),
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 rounded-lg border border-border bg-card/50">
            <div className="flex justify-between mb-2">
              <div className="font-medium">{comment.name}</div>
              <time className="text-sm text-muted-foreground">{formatDate(comment.date)}</time>
            </div>
            <p className="mb-4">{comment.content}</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{comment.likes}</span>
              </button>
              <button
                onClick={() => handleDislike(comment.id)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{comment.dislikes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-lg border border-border bg-card/50">
        <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password (for comment management)</Label>
              <Input
                id="password"
                type="password"
                value={newComment.password}
                onChange={(e) => setNewComment({ ...newComment, password: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              rows={4}
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              required
            />
          </div>
          <Button type="submit">Submit Comment</Button>
        </form>
      </div>
    </div>
  )
}
