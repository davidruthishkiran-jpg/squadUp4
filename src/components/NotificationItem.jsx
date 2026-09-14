import { Heart, MessageCircle, UserPlus, Users, CheckCircle2, Mail } from 'lucide-react'
import Avatar from './Avatar'

const icons = {
  like: { Icon: Heart, color: 'text-[var(--color-ember)]' },
  comment: { Icon: MessageCircle, color: 'text-[var(--color-signal)]' },
  follow: { Icon: UserPlus, color: 'text-[var(--color-tier)]' },
  squad: { Icon: Users, color: 'text-[var(--color-tier)]' },
  squad_accept: { Icon: CheckCircle2, color: 'text-[var(--color-signal)]' },
  message: { Icon: Mail, color: 'text-[var(--color-ember)]' },
}

export default function NotificationItem({ notification, onRead }) {
  const { Icon, color } = icons[notification.type] || icons.like
  return (
    <button
      onClick={() => onRead(notification.id)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-[var(--color-ink-border)]/60 hover:bg-[var(--color-ink-raised)] transition-colors ${
        !notification.read ? 'bg-[var(--color-ember)]/5' : ''
      }`}
    >
      <div className="relative shrink-0">
        <Avatar src={notification.user.avatar} alt={notification.user.username} size="sm" />
        <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-ink)] flex items-center justify-center ${color}`}>
          <Icon size={11} />
        </span>
      </div>
      <p className="text-sm flex-1 min-w-0">
        <span className="font-semibold">{notification.user.username}</span>{' '}
        <span className="text-[var(--color-mist)]">{notification.text}</span>
      </p>
      <span className="text-[11px] text-[var(--color-fog)] shrink-0">{notification.time}</span>
      {!notification.read && <span className="w-2 h-2 rounded-full bg-[var(--color-ember)] shrink-0" />}
    </button>
  )
}
