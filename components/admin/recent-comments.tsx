import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export function RecentComments() {
  // In a real application, this would be fetched from an API
  const comments = [
    {
      id: "1",
      name: "Alex Kim",
      content: "This is a fantastic article! I've been studying LLMs for a while...",
      date: "2023-05-15T10:30:00Z",
      postTitle: "Understanding Transformer Architecture",
      approved: true,
    },
    {
      id: "2",
      name: "Sarah Park",
      content: "I appreciate the detailed breakdown of the architecture...",
      date: "2023-05-16T14:22:00Z",
      postTitle: "Understanding Transformer Architecture",
      approved: true,
    },
    {
      id: "3",
      name: "Michael Johnson",
      content: "Great insights! I'd love to see more content about...",
      date: "2023-05-17T09:15:00Z",
      postTitle: "GPT-4: A Deep Dive",
      approved: false,
    },
    {
      id: "4",
      name: "Emily Chen",
      content: "This explanation really helped me understand the concept...",
      date: "2023-05-18T16:40:00Z",
      postTitle: "Reinforcement Learning Basics",
      approved: false,
    },
  ]

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex justify-between items-start pb-4 last:pb-0 last:mb-0 last:border-0 border-b border-border"
        >
          <div className="space-y-1">
            <div className="font-medium">{comment.name}</div>
            <p className="text-sm text-muted-foreground line-clamp-1">{comment.content}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{formatDate(comment.date)}</span>
              <span className="mx-2">•</span>
              <span>On: {comment.postTitle}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!comment.approved && (
              <>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              </>
            )}
            {comment.approved && (
              <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">Approved</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
