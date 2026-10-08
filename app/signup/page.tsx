import { AuthForm, AuthShell } from '@/components/auth/auth-form'

export default function SignupPage() {
  return <AuthShell><AuthForm mode="signup" /><p className="mt-8 text-center text-xs text-[#9aa79e]">Your password is only handled by the future secure authentication service.</p></AuthShell>
}

export const metadata = { title: 'Create account | Sage & Stone' }
