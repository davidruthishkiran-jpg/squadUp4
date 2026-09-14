import { useEffect, useState } from 'react'
import NotificationItem from '../components/NotificationItem'
import Button from '../components/Button'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    api('/notifications', { token }).then(({ notifications: items }) => setNotifications(items.map((item) => ({ ...item, id: item._id, user: { ...item.sender, id: item.sender?._id, avatar: item.sender?.profilePicture }, text: item.type.replace('_', ' '), time: new Date(item.createdAt).toLocaleDateString() })))).catch(() => {})
  }, [token])

  function markRead(id) {
    setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)))
    api(`/notifications/${id}/read`, { token, method: 'PUT' }).catch(() => {})
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
