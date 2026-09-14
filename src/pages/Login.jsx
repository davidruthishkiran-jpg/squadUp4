import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSubmitting(true)
    try { await login(identifier, password); navigate('/home') } catch (err) { setError(err.message) } finally { setSubmitting(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-ink)]">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>
        <div className="bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-2xl p-6">
          <h1 className="font-display font-semibold text-xl text-center">Welcome back</h1>
          <p className="text-sm text-[var(--color-fog)] text-center mt-1">Log in to reconnect with your squad</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
            {error && <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</p>}
            <div>
              <label className="text-xs font-medium text-[var(--color-fog)]">Email or Username</label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                type="text"
                required
                className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[var(--color-fog)]">Password</label>
                <Link to="/forgot-password" className="text-xs text-[var(--color-ember)]">Forgot password?</Link>
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
              />
            </div>
            <Button type="submit" disabled={submitting} className="w-full mt-2">{submitting ? 'Logging in...' : 'Log In'}</Button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-[var(--color-ink-border)]" />
            <span className="text-xs text-[var(--color-fog)]">or</span>
            <div className="h-px flex-1 bg-[var(--color-ink-border)]" />
          </div>

          <Button variant="secondary" className="w-full">Continue with Google</Button>
        </div>

        <p className="text-center text-sm text-[var(--color-fog)] mt-5">
          Don't have an account? <Link to="/signup" className="text-[var(--color-ember)] font-medium">Create account</Link>
        </p>
      </div>
    </div>
  )
}
