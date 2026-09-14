import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <div className="min-h-screen grid place-items-center bg-[var(--color-ink)] text-[var(--color-fog)]">Loading your squad...</div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}
