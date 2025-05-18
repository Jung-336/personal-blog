'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { BrainCircuit } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { PostgrestError } from '@supabase/supabase-js'

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1. 먼저 사용자가 존재하는지 확인
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', email)
        .single()

      if (profileError || !profileData) {
        let description = '프로필 조회 중 오류가 발생했습니다.'
        if (profileError && typeof profileError.message === 'string') {
          if (profileError.message.includes('0 rows')) {
            description = '존재하지 않는 회원입니다.'
          } else {
            description = profileError.message
          }
        } else if (!profileData) {
          description = '존재하지 않는 회원입니다.'
        }
        toast({
          title: '로그인 실패',
          description,
          variant: 'destructive',
          duration: 5000,
        })
        setIsLoading(false)
        return
      }

      // 2. 사용자가 존재하면 비밀번호 확인
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        let errorMessage = '로그인에 실패했습니다.'
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = '비밀번호가 일치하지 않습니다.'
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = '이메일 인증이 필요합니다.'
        }
        toast({
          title: '로그인 실패',
          description: errorMessage,
          variant: 'destructive',
          duration: 5000,
        })
        setIsLoading(false)
        return
      }

      if (!data.user) {
        toast({
          title: '로그인 실패',
          description: '사용자 정보를 가져오지 못했습니다.',
          variant: 'destructive',
          duration: 5000,
        })
        setIsLoading(false)
        return
      }

      // 3. 이메일 인증이 완료되지 않은 경우
      if (!data.user.email_confirmed_at) {
        await supabase.auth.signOut()
        toast({
          title: '로그인 실패',
          description: '이메일 인증이 필요합니다.',
          variant: 'destructive',
          duration: 5000,
        })
        setIsLoading(false)
        return
      }

      // 4. 로그인 성공 시 즉시 리다이렉트
      router.refresh()
      router.push('/')
    } catch (error) {
      toast({
        title: '로그인 오류',
        description: error instanceof Error ? error.message : '예기치 않은 오류가 발생했습니다.',
        variant: 'destructive',
        duration: 5000,
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <Link href="/" className="flex items-center space-x-2">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground font-heading">
                Think Beyond
              </span>
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">로그인</CardTitle>
          <CardDescription className="text-center">
            계정에 로그인하세요
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                autoComplete="email"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
            <div className="text-center text-sm">
              계정이 없으신가요?{' '}
              <Link href="/auth/register" className="text-primary hover:underline">
                회원가입
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 