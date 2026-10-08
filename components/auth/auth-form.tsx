'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'

type AuthMode = 'login' | 'signup' | 'forgot' | 'reset'

const copy = {
  login: { eyebrow: 'Welcome back', title: 'Come back to the table.', description: 'Sign in to keep your favorites and future orders close.', button: 'Sign in' },
  signup: { eyebrow: 'Join the table', title: 'Make room for good things.', description: 'Create an account to save your favorites and make future visits easier.', button: 'Create account' },
  forgot: { eyebrow: 'Account access', title: 'Let’s get you back in.', description: 'Enter your email and we’ll connect this form to a secure reset flow.', button: 'Request reset link' },
  reset: { eyebrow: 'New password', title: 'Choose a fresh key.', description: 'Set a new password for your account when the secure reset link is connected.', button: 'Reset password' },
} as const

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const text = copy[mode]
  const isSignup = mode === 'signup'
  const isReset = mode === 'reset'
  const isForgot = mode === 'forgot'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '')
    const password = String(form.get('password') || '')
    const confirm = String(form.get('confirmPassword') || '')

    if ((mode !== 'reset' && !isForgot && !email) || (isForgot && !email)) return setError('Please enter your email address.')
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Please enter a valid email address.')
    if (!isForgot && (!password || password.length < 8)) return setError('Your password must be at least 8 characters.')
    if ((isSignup || isReset) && password !== confirm) return setError('Passwords do not match.')
    setSubmitted(true)
  }

  return <div className="w-full max-w-md">
    <div className="mb-8 text-center"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7e9a80]">{text.eyebrow}</p><h1 className="mt-3 font-serif text-4xl leading-tight tracking-[-.035em] text-[#21392c] sm:text-5xl">{text.title}</h1><p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#687870]">{text.description}</p></div>
    {submitted ? <div className="rounded-2xl border border-[#cbdcca] bg-[#eef5ed] p-6 text-center"><p className="font-serif text-2xl text-[#31553f]">Your form is ready.</p><p className="mt-3 text-sm leading-6 text-[#5f7466]">This interface is intentionally not connected to a backend yet. A secure authentication service can be wired into this form without changing the restaurant UI.</p><Link href={mode === 'forgot' ? '/login' : '/'} className="mt-6 inline-flex rounded-full bg-[#31553f] px-5 py-3 text-sm font-semibold text-white">{mode === 'forgot' ? 'Return to login' : 'Back to Sage & Stone'}</Link></div> : <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {isSignup && <label className="flex flex-col gap-2 text-sm font-semibold text-[#486452]">Full name<input name="name" required placeholder="Your name" className="rounded-xl border border-[#d5e0d6] bg-white px-4 py-3.5 font-normal outline-none placeholder:text-[#9aa79e] focus:border-[#6c9273]" /></label>}
      <label className="flex flex-col gap-2 text-sm font-semibold text-[#486452]">Email<input name="email" type="email" required placeholder="you@example.com" className="rounded-xl border border-[#d5e0d6] bg-white px-4 py-3.5 font-normal outline-none placeholder:text-[#9aa79e] focus:border-[#6c9273]" /></label>
      {isSignup && <label className="flex flex-col gap-2 text-sm font-semibold text-[#486452]">Phone number<input name="phone" type="tel" required placeholder="(555) 000-0000" className="rounded-xl border border-[#d5e0d6] bg-white px-4 py-3.5 font-normal outline-none placeholder:text-[#9aa79e] focus:border-[#6c9273]" /></label>}
      {!isForgot && <><label className="flex flex-col gap-2 text-sm font-semibold text-[#486452]">{isReset ? 'New password' : 'Password'}<span className="relative"><LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91a096]" size={17} /><input name="password" type={showPassword ? 'text' : 'password'} required placeholder="At least 8 characters" className="w-full rounded-xl border border-[#d5e0d6] bg-white px-11 py-3.5 font-normal outline-none placeholder:text-[#9aa79e] focus:border-[#6c9273]" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#718078]">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label><p className="-mt-2 text-xs text-[#87948b]">Use at least 8 characters with a mix of letters and numbers.</p></>}
      {(isSignup || isReset) && <label className="flex flex-col gap-2 text-sm font-semibold text-[#486452]">Confirm password<span className="relative"><UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91a096]" size={17} /><input name="confirmPassword" type={showConfirm ? 'text' : 'password'} required placeholder="Repeat your password" className="w-full rounded-xl border border-[#d5e0d6] bg-white px-11 py-3.5 font-normal outline-none placeholder:text-[#9aa79e] focus:border-[#6c9273]" /><button type="button" onClick={() => setShowConfirm(!showConfirm)} aria-label={showConfirm ? 'Hide confirmation password' : 'Show confirmation password'} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#718078]">{showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>}
      {isSignup && <label className="flex items-center gap-2 text-sm text-[#687870]"><input type="checkbox" required className="accent-[#31553f]" />I agree to the terms and privacy policy.</label>}
      {mode === 'login' && <label className="flex items-center gap-2 text-sm text-[#687870]"><input type="checkbox" name="remember" className="accent-[#31553f]" />Remember me</label>}
      {error && <p role="alert" className="rounded-xl bg-[#fff0ec] px-4 py-3 text-sm text-[#a34f45]">{error}</p>}
      <button type="submit" className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#31553f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#264733]">{text.button}<Mail size={16} /></button>
    </form>}
    {!submitted && <div className="mt-6 flex flex-col items-center gap-3 text-sm text-[#718078]">{mode === 'login' && <><Link href="/forgot-password" className="font-semibold text-[#41634b] hover:underline">Forgot password?</Link><span>New here? <Link href="/signup" className="font-semibold text-[#41634b] hover:underline">Create an account</Link></span></>}{mode === 'signup' && <span>Already have an account? <Link href="/login" className="font-semibold text-[#41634b] hover:underline">Sign in</Link></span>}{(isForgot || isReset) && <Link href="/login" className="font-semibold text-[#41634b] hover:underline">Back to login</Link>}</div>}
  </div>
}

export function AuthShell({ children }: { children: React.ReactNode }) { return <main className="flex min-h-screen items-center justify-center bg-[#fbfaf7] px-5 py-10"><div className="absolute left-5 top-6 sm:left-10"><Link href="/" className="text-sm font-semibold tracking-[0.18em] text-[#345441]">SAGE &amp; STONE</Link></div><div className="w-full">{children}</div></main> }

export function AuthIcon() { return <span aria-hidden="true"><UserRound size={19} /></span> }

export const AuthMailIcon = Mail
