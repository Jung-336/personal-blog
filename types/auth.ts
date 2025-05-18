export interface AuthFormData {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  error?: string
  message?: string
}

export interface UserProfile {
  id: string
  email: string
  created_at: string
  updated_at: string
} 