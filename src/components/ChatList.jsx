import Avatar from './Avatar'

export default function ChatList({ conversations, activeId, onSelect }) {
  return (
    <div className="flex flex-col overflow-y-auto scrollbar-none">
      {conversations.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`flex items-center gap-3 px-4 py-3 text-left border-b border-[var(--color-ink-border)]/60 hover:bg-[var(--color-ink-raised)] transition-colors ${
            activeId === c.id ? 'bg-[var(--color-ink-raised)]' : ''
          }`}
        >
          <Avatar src={c.user.avatar} alt={c.user.username} status={c.user.status} size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium truncate">{c.user.username}</span>
              <span className="text-[11px] text-[var(--color-fog)] shrink-0">{c.timestamp}</span>
            </div>
            <p className={`text-xs truncate mt-0.5 ${c.unread ? 'text-[var(--color-mist)] font-medium' : 'text-[var(--color-fog)]'}`}>
              {c.lastMessage}
            </p>
          </div>
          {c.unread > 0 && (
            <span className="w-5 h-5 rounded-full bg-[var(--color-ember)] text-[#160A05] text-[10px] font-bold flex items-center justify-center shrink-0">
              {c.unread}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
