import { useState } from 'react'
import { Users } from 'lucide-react'
import Button from '../components/Button'
import { communities as mockCommunities } from '../data/mockData'

export default function Communities() {
  const [joined, setJoined] = useState({})

  function toggleJoin(id) {
    setJoined((j) => ({ ...j, [id]: !j[id] }))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-0 py-6">
      <h1 className="font-display font-semibold text-2xl mb-1">Communities</h1>
      <p className="text-sm text-[var(--color-fog)] mb-6">Hubs built around the games you play</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {mockCommunities.map((c) => (
          <div key={c.id} className="bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-2xl overflow-hidden">
            <div className="h-20 bg-gradient-to-br from-[var(--color-tier)]/30 to-[var(--color-ember)]/20" />
            <div className="p-4">
              <h3 className="font-display font-semibold">{c.name}</h3>
              <p className="text-xs text-[var(--color-fog)] mt-1 flex items-center gap-1">
                <Users size={11} /> {c.members.toLocaleString()} members
              </p>
              <p className="text-sm text-[var(--color-mist)] mt-2.5 leading-relaxed">{c.description}</p>
              <Button
                variant={joined[c.id] ? 'secondary' : 'primary'}
                size="sm"
                className="w-full mt-4"
                onClick={() => toggleJoin(c.id)}
              >
                {joined[c.id] ? 'Joined' : 'Join'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
