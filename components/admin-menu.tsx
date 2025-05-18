"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Settings, FileText, PlusCircle, Edit, Trash2, LogOut } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { formatDate } from "@/lib/utils"
import { AdminLoginModal } from "./admin-login-modal"

// Mock data for recent posts - in a real app, this would come from an API
const recentPosts = [
  {
    id: "1",
    title: "Understanding Transformer Architecture",
    slug: "understanding-transformer-architecture",
    date: "2023-05-10T09:00:00Z",
  },
  {
    id: "2",
    title: "GPT-4: A Deep Dive",
    slug: "gpt-4-deep-dive",
    date: "2023-05-05T14:30:00Z",
  },
  {
    id: "3",
    title: "The Evolution of Computer Vision",
    slug: "evolution-computer-vision",
    date: "2023-04-28T11:15:00Z",
  },
]

export function AdminMenu() {
  const router = useRouter()
  const [showRecentPosts, setShowRecentPosts] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<{ id: string; title: string } | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isAdminLoggedIn") === "true"
      setIsLoggedIn(loginStatus)
    }

    // Check on mount
    checkLoginStatus()

    // Set up event listener for storage changes (in case of login in another tab)
    window.addEventListener("storage", checkLoginStatus)

    return () => {
      window.removeEventListener("storage", checkLoginStatus)
    }
  }, [])

  const handleNewPost = () => {
    router.push("/admin/posts/new")
  }

  const handleEditPost = (id: string) => {
    router.push(`/admin/posts/edit/${id}`)
  }

  const confirmDelete = (id: string, title: string) => {
    setPostToDelete({ id, title })
    setDeleteDialogOpen(true)
  }

  const handleDeletePost = () => {
    if (!postToDelete) return

    // In a real app, this would call an API to delete the post
    console.log(`Deleting post: ${postToDelete.id}`)

    toast({
      title: "Post deleted",
      description: `"${postToDelete.title}" has been deleted.`,
    })

    setDeleteDialogOpen(false)
    setPostToDelete(null)
  }

  const handleLogin = () => {
    setIsLoginModalOpen(false)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn")
    setIsLoggedIn(false)
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
  }

  const handleAdminClick = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={handleAdminClick}>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Admin menu</span>
          </Button>
        </DropdownMenuTrigger>
        {isLoggedIn ? (
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNewPost}>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>New Post</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowRecentPosts(true)}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Manage Posts</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/admin")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : null}
      </DropdownMenu>

      <Dialog open={showRecentPosts} onOpenChange={setShowRecentPosts}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Recent Posts</DialogTitle>
            <DialogDescription>Manage your recent blog posts. Edit or delete posts as needed.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="space-y-4 py-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditPost(post.id)}
                      aria-label={`Edit ${post.title}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => confirmDelete(post.id, post.title)}
                      aria-label={`Delete ${post.title}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button variant="secondary" onClick={() => router.push("/admin/posts")}>
              View All Posts
            </Button>
            <Button onClick={handleNewPost}>New Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="font-medium">{postToDelete?.title}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePost}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AdminLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
    </>
  )
}
