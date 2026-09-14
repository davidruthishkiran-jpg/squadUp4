import { useParams, Link } from 'react-router-dom'
import { Mic, Clock, Users2 } from 'lucide-react'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import { squadRequests, gamers, currentUser } from '../data/mockData'

export default function SquadDetail() {
  const { id } = useParams()
  const squad = squadRequests.find((s) => s.id === id)

  if (!squad) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="font-display font-semibold text-lg">Squad not found</p>
        <Link to="/squads" className="text-sm text-[var(--color-ember)] mt-2 inline-block">Back to Squads</Link>
      </div>
    )
  }

  const members = [squad.owner, ...gamers.slice(0, squad.membersJoined - 1)]

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-0 py-6">
      <div className="h-32 rounded-2xl bg-gradient-to-br from-[var(--color-tier)]/30 to-[var(--color-ink-card)] border border-[var(--color-ink-border)]" />

      <div className="mt-4">
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--color-tier)]/15 text-[var(--color-tier)]">
          {squad.game}
        </span>
        <h1 className="font-display font-semibold text-2xl mt-2">{squad.title}</h1>
        <p className="text-sm text-[var(--color-mist)] mt-2 leading-relaxed">{squad.description}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] text-[var(--color-mist)] flex items-center gap-1">
            <Clock size={12} /> {squad.time}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] text-[var(--color-mist)]">
            Rank: {squad.rank}
          </span>
          {squad.voiceChat && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-signal)]/15 text-[var(--color-signal)] flex items-center gap-1">
              <Mic size={12} /> Voice required
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-5">
          <Button>Join Squad</Button>
          <Button variant="secondary">Invite Player</Button>
          <Button variant="danger">Leave Squad</Button>
        </div>

        <div className="mt-8">
          <h2 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
            <Users2 size={17} /> Members ({squad.membersJoined}/{squad.maxMembers})
          </h2>
          <div className="space-y-2">
            {members.map((m) => (
              <Link
                key={m.id}
                to={`/profile/${m.username}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] hover:border-[#3A4356]"
              >
                <Avatar src={m.avatar} alt={m.username} status={m.status || 'online'} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{m.username}</p>
                  <p className="text-xs text-[var(--color-fog)]">{m.role || squad.roles[0]}</p>
                </div>
                {m.id === currentUser.id && <span className="text-[10px] text-[var(--color-ember)]">You</span>}
              </Link>
            ))}
          </div>
        </div>

        <Link to="/messages" className="block mt-6">
          <Button variant="secondary" className="w-full">Open Squad Chat</Button>
        </Link>
      </div>
    </div>
  )
}
