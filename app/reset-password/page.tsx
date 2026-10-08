import { AuthForm, AuthShell } from '@/components/auth/auth-form'

export default function ResetPasswordPage() {
  return <AuthShell><AuthForm mode="reset" /></AuthShell>
}

export const metadata = { title: 'Reset password | Sage & Stone' }
