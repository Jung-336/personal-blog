"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Tag = {
  name: string
  count: number
}

export function TagCloud() {
  // In a real application, this would be fetched from an API
  const [tags, setTags] = useState<Tag[]>([
    { name: "machine-learning", count: 24 },
    { name: "neural-networks", count: 18 },
    { name: "deep-learning", count: 15 },
    { name: "llm", count: 12 },
    { name: "gpt", count: 10 },
    { name: "transformers", count: 9 },
    { name: "computer-vision", count: 8 },
    { name: "nlp", count: 7 },
    { name: "reinforcement-learning", count: 6 },
    { name: "ai-ethics", count: 5 },
    { name: "data-science", count: 5 },
    { name: "tensorflow", count: 4 },
    { name: "pytorch", count: 4 },
    { name: "generative-ai", count: 3 },
    { name: "chatgpt", count: 3 },
  ])

  const maxCount = Math.max(...tags.map((tag) => tag.count))
  const minCount = Math.min(...tags.map((tag) => tag.count))

  const getFontSize = (count: number) => {
    const minSize = 0.75
    const maxSize = 1.5

    if (maxCount === minCount) return 1

    const size = minSize + ((count - minCount) / (maxCount - minCount)) * (maxSize - minSize)
    return size
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.name}
          href={`/tag/${tag.name}`}
          className={cn(
            "inline-block px-3 py-1 rounded-full bg-secondary/30 hover:bg-secondary/50 transition-colors",
            "text-secondary-foreground",
          )}
          style={{ fontSize: `${getFontSize(tag.count)}rem` }}
        >
          #{tag.name.replace(/-/g, " ")}
        </Link>
      ))}
    </div>
  )
}
