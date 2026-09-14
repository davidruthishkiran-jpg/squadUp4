const colors = {
  online: 'bg-[var(--color-signal)]',
  'in-game': 'bg-[var(--color-ember)]',
  offline: 'bg-[var(--color-fog)]',
}

const labels = {
  online: 'Online',
  'in-game': 'In Game',
  offline: 'Offline',
}

const sizes = {
  sm: 'w-2.5 h-2.5',
  md: 'w-3.5 h-3.5',
}

export default function StatusIndicator({ status = 'offline', size = 'sm', ring = false, showLabel = false }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`rounded-full ${colors[status]} ${sizes[size]} ${ring ? 'ring-2 ring-[var(--color-ink)]' : ''} ${status === 'in-game' ? 'animate-pulse' : ''}`}
        title={labels[status]}
      />
      {showLabel && <span className="text-xs text-[var(--color-fog)]">{labels[status]}</span>}
    </span>
  )
}
