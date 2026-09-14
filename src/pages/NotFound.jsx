import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="font-display font-bold text-6xl text-[var(--color-ember)]">404</p>
      <p className="text-lg font-display font-semibold mt-3">This page respawned somewhere else</p>
      <p className="text-sm text-[var(--color-fog)] mt-1">The page you're looking for doesn't exist.</p>
      <Link to="/home" className="mt-6">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}
