import Link from 'next/link'
import { AuthForm, AuthShell } from '@/components/auth/auth-form'

export default function LoginPage() {
  return <AuthShell><AuthForm mode="login" /><p className="mt-8 text-center text-xs text-[#9aa79e]">Secure sign-in will be enabled when a backend provider is connected.</p></AuthShell>
}

export const metadata = { title: 'Sign in | Sage & Stone' }
