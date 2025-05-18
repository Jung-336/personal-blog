"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export function AdminLoginModal({ isOpen, onClose, onLogin }: AdminLoginModalProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (!data.user) {
        throw new Error('로그인에 실패했습니다.')
      }

      // Admin 권한 확인
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        await supabase.auth.signOut()
        throw new Error('관리자 권한이 없습니다.')
      }

      toast({
        title: "로그인 성공",
        description: "관리자 대시보드에 오신 것을 환영합니다!",
      })

      onLogin()
      router.refresh()
    } catch (error) {
      toast({
        title: "로그인 실패",
        description: error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>관리자 로그인</DialogTitle>
          <DialogDescription>관리자 계정으로 로그인하세요.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose} className="sm:mr-auto" disabled={isLoading}>
              취소
            </Button>
            <Link href="/admin/forgot-password" className="text-sm text-primary hover:underline">
              비밀번호를 잊으셨나요?
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
