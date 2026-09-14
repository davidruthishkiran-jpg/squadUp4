import { NavLink } from 'react-router-dom'
import { Home, Compass, Users, MessageSquare, Bell, PlusSquare } from 'lucide-react'
import Logo from './Logo'
import Avatar from './Avatar'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/squads', label: 'Squads', icon: Users },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/create', label: 'Create', icon: PlusSquare },
]

export default function Sidebar() {
  const { user } = useAuth()
  return (
    <aside className="hidden xl:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-[var(--color-ink-border)] px-4 py-6">
      <div className="px-2 mb-8">
        <Logo size="lg" />
      </div>

      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--color-ink-card)] text-[#EDEFF5]'
                  : 'text-[var(--color-fog)] hover:text-[#EDEFF5] hover:bg-[var(--color-ink-raised)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={19} className={isActive ? 'text-[var(--color-ember)]' : ''} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <NavLink
          to={`/profile/${user?.username || ''}`}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive ? 'bg-[var(--color-ink-card)]' : 'hover:bg-[var(--color-ink-raised)]'
            }`
          }
        >
          <Avatar src={user?.profilePicture} alt={user?.username || 'Your profile'} status={user?.status} size="sm" />
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{user?.username || 'Your profile'}</div>
            <div className="text-xs text-[var(--color-fog)] truncate">{user?.gamerStatus || 'Set your gamer status'}</div>
          </div>
        </NavLink>
      </div>
    </aside>
  )
}
