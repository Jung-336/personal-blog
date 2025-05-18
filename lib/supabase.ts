import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)

// Supabase 연결 테스트 함수
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('_test_connection').select('*').limit(1)
    
    if (error) {
      console.error('Supabase 연결 에러:', error.message)
      return false
    }
    
    console.log('Supabase 연결 성공!')
    return true
  } catch (error) {
    console.error('Supabase 연결 테스트 중 예외 발생:', error)
    return false
  }
} 