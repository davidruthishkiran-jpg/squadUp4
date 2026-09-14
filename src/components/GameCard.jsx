import { Gamepad2 } from 'lucide-react'

export default function GameCard({ game }) {
  return (
    <div className="bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-2xl p-4 flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${game.color}22`, color: game.color }}
      >
        <Gamepad2 size={22} />
      </div>
      <div className="min-w-0">
        <h4 className="font-semibold text-sm truncate">{game.name}</h4>
        <p className="text-xs text-[var(--color-fog)] mt-0.5">{game.hours} hrs · {game.role}</p>
        {game.rank !== '—' && <p className="text-xs text-[var(--color-mist)] mt-0.5">Rank: {game.rank}</p>}
      </div>
    </div>
  )
}
