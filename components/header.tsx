"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { useState, useEffect } from "react"
import { Menu, X, Search, BrainCircuit } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdminMenu } from "./admin-menu"
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground font-heading">
                Think Beyond
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 ml-auto">
            <nav className="flex items-center space-x-6">
              <Link
                href="/"
                className={cn(
                  'text-foreground/80 hover:text-foreground transition-colors',
                  isActive('/') ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                홈
              </Link>
              <Link
                href="/blog"
                className={cn(
                  'text-foreground/80 hover:text-foreground transition-colors',
                  isActive('/blog') ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                블로그
              </Link>
              <Link
                href="/categories"
                className={cn(
                  'text-foreground/80 hover:text-foreground transition-colors',
                  isActive('/categories') ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                카테고리
              </Link>
              <Link
                href="/about"
                className={cn(
                  'text-foreground/80 hover:text-foreground transition-colors',
                  isActive('/about') ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                소개
              </Link>
            </nav>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <AdminMenu />
              <ModeToggle />
            </div>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <AdminMenu />
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    로그인
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">
                    회원가입
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <BrainCircuit className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground font-heading">
                  Think Beyond
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col space-y-6 py-8">
              <Link
                href="/"
                className={cn(
                  'text-2xl font-medium',
                  isActive('/') ? 'text-foreground' : 'text-foreground/60'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                홈
              </Link>
              <Link
                href="/blog"
                className={cn(
                  'text-2xl font-medium',
                  isActive('/blog') ? 'text-foreground' : 'text-foreground/60'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                블로그
              </Link>
              <Link
                href="/categories"
                className={cn(
                  'text-2xl font-medium',
                  isActive('/categories') ? 'text-foreground' : 'text-foreground/60'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                카테고리
              </Link>
              <Link
                href="/about"
                className={cn(
                  'text-2xl font-medium',
                  isActive('/about') ? 'text-foreground' : 'text-foreground/60'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                소개
              </Link>
              <div className="pt-4">
                <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <Search className="h-5 w-5 mr-2" />
                  검색
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
