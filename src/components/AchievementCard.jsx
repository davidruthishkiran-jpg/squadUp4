export default function AchievementCard({ achievement }) {
  return (
    <div
      className={`bg-[var(--color-ink-card)] border rounded-2xl p-4 flex flex-col items-center text-center gap-2 ${
        achievement.earned ? 'border-[var(--color-ink-border)]' : 'border-[var(--color-ink-border)] opacity-40'
      }`}
    >
      <span className="text-3xl">{achievement.icon}</span>
      <span className="text-xs font-medium leading-tight">{achievement.name}</span>
      {!achievement.earned && <span className="text-[10px] text-[var(--color-fog)]">Locked</span>}
    </div>
  )
}
