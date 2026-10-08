export type AuthUser = {
  id: string
  name: string
  email: string
}

export type AuthStatus = 'loading' | 'signed-out' | 'signed-in'

/**
 * Replace these operations with the real provider's server-backed calls.
 * The current phase intentionally has no session, password storage, or fake login.
 */
export type AuthOperations = {
  status: AuthStatus
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  signup: (input: { name: string; email: string; phone: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  requestPasswordReset: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
}
