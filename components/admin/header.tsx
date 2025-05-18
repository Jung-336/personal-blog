"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function AdminHeader() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Posts", href: "/admin/posts" },
    { name: "Comments", href: "/admin/comments" },
    { name: "Categories", href: "/admin/categories" },
    { name: "Settings", href: "/admin/settings" },
  ]

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank">
            <Button variant="outline">View Site</Button>
          </Link>
          <Link href="/admin/posts/new">
            <Button>New Post</Button>
          </Link>
        </div>
      </div>

      <nav className="flex overflow-x-auto pb-2">
        <div className="flex space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
