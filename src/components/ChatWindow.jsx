import { useState } from 'react'
import { Smile, Paperclip, Send, Check, CheckCheck } from 'lucide-react'
import Avatar from './Avatar'
import StatusIndicator from './StatusIndicator'

function MessageState({ state }) {
  if (state === 'read') return <CheckCheck size={14} className="text-[var(--color-signal)]" />
  if (state === 'delivered') return <CheckCheck size={14} className="text-[var(--color-fog)]" />
  return <Check size={14} className="text-[var(--color-fog)]" />
}

export default function ChatWindow({ conversation, onSend }) {
  const [draft, setDraft] = useState('')

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-[var(--color-fog)] text-sm">
        Select a conversation to start chatting
      </div>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!draft.trim()) return
    onSend(draft.trim())
    setDraft('')
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[var(--color-ink-border)]">
        <Avatar src={conversation.user.avatar} alt={conversation.user.username} size="sm" />
        <div>
          <div className="text-sm font-semibold">{conversation.user.username}</div>
          <StatusIndicator status={conversation.user.status} showLabel />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {conversation.messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl px-3.5 py-2.5 ${
              m.from === 'me'
                ? 'bg-[var(--color-ember)] text-[#160A05] rounded-br-sm'
                : 'bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-bl-sm'
            }`}>
              <p className="text-sm">{m.text}</p>
              <div className={`flex items-center gap-1 mt-1 justify-end ${m.from === 'me' ? 'text-[#160A05]/70' : 'text-[var(--color-fog)]'}`}>
                <span className="text-[10px]">{m.time}</span>
                {m.from === 'me' && <MessageState state={m.state} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-[var(--color-ink-border)]">
        <button type="button" className="p-2 rounded-lg text-[var(--color-fog)] hover:text-white hover:bg-[var(--color-ink-raised)]">
          <Smile size={19} />
        </button>
        <button type="button" className="p-2 rounded-lg text-[var(--color-fog)] hover:text-white hover:bg-[var(--color-ink-raised)]">
          <Paperclip size={19} />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message..."
          className="flex-1 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
        />
        <button type="submit" className="p-2.5 rounded-xl bg-[var(--color-ember)] text-[#160A05]">
          <Send size={17} />
        </button>
      </form>
    </div>
  )
}
