"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This would be where you'd initialize any client-side code for the blog content
    // For example, syntax highlighting for code blocks, etc.

    // For demo purposes, we're just setting the content directly
    if (contentRef.current) {
      contentRef.current.innerHTML = content
    }
  }, [content])

  return (
    <div
      ref={contentRef}
      className={cn(
        "prose prose-lg dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-headings:tracking-tight",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-code:rounded prose-code:bg-muted prose-code:p-1",
        "prose-pre:rounded-lg prose-pre:bg-muted",
        "prose-img:rounded-lg",
      )}
    />
  )
}
