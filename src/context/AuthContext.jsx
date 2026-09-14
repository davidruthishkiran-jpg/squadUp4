import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('squadup_token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(token))
  const isAuthenticated = Boolean(token && user)

  useEffect(() => {
    if (!token) { setLoading(false); return }
    api('/auth/me', { token }).then(({ user: sessionUser }) => setUser(sessionUser)).catch(() => { localStorage.removeItem('squadup_token'); setToken(null) }).finally(() => setLoading(false))
  }, [token])

  function saveSession({ token: nextToken, user: nextUser }) {
    localStorage.setItem('squadup_token', nextToken)
    setToken(nextToken); setUser(nextUser)
  }

  async function login(identifier, password) {
    const session = await api('/auth/login', { method: 'POST', body: JSON.stringify({ identifier, password }) })
    saveSession(session)
    return session
  }

  async function register(form) {
    const session = await api('/auth/register', { method: 'POST', body: JSON.stringify(form) })
    saveSession(session)
    return session
  }

  function logout() {
    localStorage.removeItem('squadup_token'); setToken(null); setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
