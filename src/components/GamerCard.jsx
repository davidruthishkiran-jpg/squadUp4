import { Link } from 'react-router-dom'
import { useState } from 'react'
import { UserPlus, MessageSquare, Users } from 'lucide-react'
import Avatar from './Avatar'
import Button from './Button'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function GamerCard({ gamer }) {
  const [following, setFollowing] = useState(false)
  const { token } = useAuth()
  async function toggleFollow() {
    if (!gamer.id || gamer.id.length !== 24) return setFollowing((value) => !value)
    const next = !following
    setFollowing(next)
    try { await api(`/users/${gamer.id}/follow`, { token, method: next ? 'POST' : 'DELETE' }) } catch { setFollowing(!next) }
  }
  return (
    <div className="bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#3A4356] transition-colors">
      <Link to={`/profile/${gamer.username}`}>
        <Avatar src={gamer.avatar} alt={gamer.username} status={gamer.status} size="lg" />
      </Link>
      <Link to={`/profile/${gamer.username}`} className="mt-3 font-semibold text-sm hover:text-[var(--color-ember)]">
        {gamer.username}
      </Link>
      <span className="text-xs text-[var(--color-fog)] mt-0.5">{gamer.game} · {gamer.role}</span>

      <div className="flex items-center gap-1.5 mt-2.5 flex-wrap justify-center">
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] text-[var(--color-mist)]">
          {gamer.skillLevel}
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] text-[var(--color-mist)]">
          {gamer.platform}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-4 w-full">
        <Button variant={following ? 'secondary' : 'primary'} size="sm" className="flex-1" onClick={toggleFollow}>
          <UserPlus size={14} /> {following ? 'Following' : 'Follow'}
        </Button>
        <Link to={`/messages?user=${gamer.id}&username=${encodeURIComponent(gamer.username)}`} className="inline-flex">
          <Button variant="secondary" size="sm" className="!px-2.5">
          <MessageSquare size={14} />
          </Button>
        </Link>
        <Button variant="secondary" size="sm" className="!px-2.5">
          <Users size={14} />
        </Button>
      </div>
    </div>
  )
}
