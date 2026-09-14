import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ChatList from '../components/ChatList'
import ChatWindow from '../components/ChatWindow'
import { conversations as mockConversations } from '../data/mockData'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

function presentMessage(message, currentId) {
  return { id: message._id, from: message.sender._id === currentId ? 'me' : 'them', text: message.text, time: new Date(message.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), state: message.read ? 'read' : 'sent' }
}

export default function Messages() {
  const [conversations, setConversations] = useState(mockConversations)
  const [activeId, setActiveId] = useState(mockConversations[0]?.id)
  const [showChatOnMobile, setShowChatOnMobile] = useState(false)
  const [params] = useSearchParams()
  const { token, user } = useAuth()

  useEffect(() => {
    api('/messages/conversations', { token }).then(({ conversations: latest }) => {
      if (!latest.length) return
      const items = latest.map((message) => {
        const other = message.sender._id === user._id ? message.receiver : message.sender
        return { id: message.conversation, receiverId: other._id, user: { ...other, id: other._id, avatar: other.profilePicture }, lastMessage: message.text, timestamp: new Date(message.createdAt).toLocaleDateString(), unread: 0, messages: [] }
      })
      setConversations(items); setActiveId(items[0].id)
    }).catch(() => {})
  }, [token, user?._id])

  useEffect(() => {
    const receiverId = params.get('user'); const username = params.get('username')
    if (!receiverId || conversations.some((conversation) => conversation.receiverId === receiverId)) return
    const id = [user?._id, receiverId].filter(Boolean).sort().join('_')
    const item = { id, receiverId, user: { id: receiverId, username: username || 'Gamer', avatar: '', status: 'offline' }, lastMessage: 'Start a conversation', timestamp: '', unread: 0, messages: [] }
    setConversations((items) => [item, ...items]); setActiveId(id); setShowChatOnMobile(true)
  }, [params, conversations, user?._id])

  const active = conversations.find((c) => c.id === activeId)

  function handleSelect(id) {
    setActiveId(id)
    setShowChatOnMobile(true)
    setConversations((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)))
    api(`/messages/${id}`, { token }).then(({ messages }) => setConversations((cs) => cs.map((c) => c.id === id ? { ...c, messages: messages.map((message) => presentMessage(message, user._id)) } : c))).catch(() => {})
  }

  async function handleSend(text) {
    const conversation = conversations.find((item) => item.id === activeId)
    if (!conversation?.receiverId) return
    const optimistic = { id: `local-${Date.now()}`, from: 'me', text, time: 'now', state: 'sent' }
    setConversations((cs) =>
      cs.map((c) =>
        c.id === activeId
          ? {
              ...c,
              lastMessage: text,
              timestamp: 'now',
              messages: [...c.messages, optimistic],
            }
          : c
      )
    )
    try { await api('/messages', { token, method: 'POST', body: JSON.stringify({ receiver: conversation.receiverId, text }) }) } catch { /* optimistic message remains visible while the user retries */ }
  }

  return (
    <div className="max-w-5xl mx-auto lg:px-0 lg:py-6 h-[calc(100vh-0px)] lg:h-[calc(100vh-90px)]">
      <div className="h-full lg:border border-[var(--color-ink-border)] lg:rounded-2xl overflow-hidden flex">
        <div className={`w-full lg:w-80 shrink-0 border-r border-[var(--color-ink-border)] flex flex-col ${showChatOnMobile ? 'hidden lg:flex' : 'flex'}`}>
          <div className="px-4 py-4 border-b border-[var(--color-ink-border)]">
            <h1 className="font-display font-semibold text-lg">Messages</h1>
          </div>
          <ChatList conversations={conversations} activeId={activeId} onSelect={handleSelect} />
        </div>
        <div className={`flex-1 flex ${showChatOnMobile ? 'flex' : 'hidden lg:flex'}`}>
          <ChatWindow conversation={active} onSend={handleSend} />
        </div>
      </div>
    </div>
  )
}
