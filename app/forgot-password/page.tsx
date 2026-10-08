import { AuthForm, AuthShell } from '@/components/auth/auth-form'

export default function ForgotPasswordPage() {
  return <AuthShell><AuthForm mode="forgot" /></AuthShell>
}

export const metadata = { title: 'Forgot password | Sage & Stone' }
