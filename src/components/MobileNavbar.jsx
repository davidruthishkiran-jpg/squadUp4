import { NavLink } from 'react-router-dom'
import { Home, Compass, PlusSquare, MessageSquare, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const baseLinks = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/create', label: 'Create', icon: PlusSquare },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
]

export default function MobileNavbar() {
  const { user } = useAuth()
  const links = [...baseLinks, { to: `/profile/${user?.username || ''}`, label: 'Profile', icon: User }]
  return (
    <nav className="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--color-ink-card)]/95 backdrop-blur border-t border-[var(--color-ink-border)] flex items-center justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl ${
              isActive ? 'text-[var(--color-ember)]' : 'text-[var(--color-fog)]'
            }`
          }
        >
          <Icon size={21} />
          <span className="text-[10px] font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
