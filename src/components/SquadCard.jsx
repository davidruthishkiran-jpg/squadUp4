import { Link } from 'react-router-dom'
import { Mic, Clock, Users2 } from 'lucide-react'
import Avatar from './Avatar'
import Button from './Button'

export default function SquadCard({ squad }) {
  return (
    <div className="bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-2xl p-5 hover:border-[#3A4356] transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--color-tier)]/15 text-[var(--color-tier)]">
            {squad.game}
          </span>
          <h3 className="font-display font-semibold text-lg mt-2 leading-snug">{squad.title}</h3>
        </div>
        <span className="text-xs text-[var(--color-fog)] shrink-0 flex items-center gap-1">
          <Clock size={12} /> {squad.time}
        </span>
      </div>

      <p className="text-sm text-[var(--color-mist)] mt-2 leading-relaxed">{squad.description}</p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] text-[var(--color-mist)]">
          Rank: {squad.rank}
        </span>
        {squad.roles.map((r) => (
          <span key={r} className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] text-[var(--color-mist)]">
            {r}
          </span>
        ))}
        {squad.voiceChat && (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-signal)]/15 text-[var(--color-signal)] flex items-center gap-1">
            <Mic size={10} /> Voice required
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-ink-border)]">
        <Link to={`/profile/${squad.owner.username}`} className="flex items-center gap-2">
          <Avatar src={squad.owner.avatar} alt={squad.owner.username} size="sm" />
          <div className="text-xs">
            <div className="text-[var(--color-mist)]">{squad.owner.username}</div>
            <div className="text-[var(--color-fog)] flex items-center gap-1">
              <Users2 size={11} /> {squad.membersJoined}/{squad.maxMembers}
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link to={`/squads/${squad.id}`}>
            <Button variant="secondary" size="sm">View</Button>
          </Link>
          <Button variant="primary" size="sm">Join</Button>
        </div>
      </div>
    </div>
  )
}
