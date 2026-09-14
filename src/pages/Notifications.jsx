import { useState } from 'react'
import NotificationItem from '../components/NotificationItem'
import Button from '../components/Button'
import { notifications as mockNotifications } from '../data/mockData'

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications)

  function markRead(id) {
    setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  function markAllRead() {
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="max-w-xl mx-auto px-4 lg:px-0 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display font-semibold text-2xl">Notifications</h1>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead}>Mark all read</Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-display font-semibold text-lg">Nothing new</p>
          <p className="text-sm text-[var(--color-fog)] mt-1">You're all caught up.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--color-ink-border)] overflow-hidden">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} onRead={markRead} />
          ))}
        </div>
      )}
    </div>
  )
}
