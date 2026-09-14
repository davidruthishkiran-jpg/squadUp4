import { Link } from 'react-router-dom'
import { Search, Bell } from 'lucide-react'
import Logo from './Logo'

export default function Navbar() {
  return (
    <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[var(--color-ink)]/95 backdrop-blur border-b border-[var(--color-ink-border)]">
      <Logo />
      <div className="flex items-center gap-1">
        <Link to="/search" className="p-2 rounded-lg text-[var(--color-mist)] hover:bg-[var(--color-ink-raised)]">
          <Search size={20} />
        </Link>
        <Link to="/notifications" className="p-2 rounded-lg text-[var(--color-mist)] hover:bg-[var(--color-ink-raised)]">
          <Bell size={20} />
        </Link>
      </div>
    </header>
  )
}
