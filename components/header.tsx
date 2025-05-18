"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { useState, useEffect } from "react"
import { Menu, X, Search, BrainCircuit } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdminMenu } from "./admin-menu"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-foreground/80 hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/categories" className="text-foreground/80 hover:text-foreground transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <AdminMenu />
            <ModeToggle />
          </nav>

          <div className="flex md:hidden items-center space-x-4">
            <AdminMenu />
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
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
              <Link href="/" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/blog" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/categories" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Categories
              </Link>
              <Link href="/about" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              <div className="pt-4">
                <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
