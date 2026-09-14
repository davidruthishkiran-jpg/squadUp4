import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Share2, Bookmark, Gamepad2, MoreHorizontal, Trash2 } from 'lucide-react'
import Avatar from './Avatar'
import { currentUser } from '../data/mockData'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function PostCard({ post, onDelete }) {
  const [liked, setLiked] = useState(post.liked)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [saved, setSaved] = useState(post.saved)
  const [menuOpen, setMenuOpen] = useState(false)
  const [actionError, setActionError] = useState('')
  const { token, user } = useAuth()
  const isOwner = post.user.id === (user?._id || user?.id || currentUser.id)

  async function toggleLike() {
    const previousLiked = liked
    setLiked((l) => !l)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
    if (!post.id || post.id.length !== 24) return
    try {
      const result = await api(`/posts/${post.id}/like`, { token, method: 'POST' })
      setLiked(result.liked); setLikeCount(result.likeCount)
    } catch (error) { setLiked(previousLiked); setLikeCount((c) => (previousLiked ? c + 1 : c - 1)); setActionError(error.message) }
  }

  async function deletePost() {
    setMenuOpen(false)
    if (!post.id || post.id.length !== 24) return onDelete?.(post.id)
    try { await api(`/posts/${post.id}`, { token, method: 'DELETE' }); onDelete?.(post.id) } catch (error) { setActionError(error.message) }
  }

  function formatCount(n) {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n
  }

  return (
    <article className="bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to={`/profile/${post.user.username}`} className="flex items-center gap-3">
          <Avatar src={post.user.avatar} alt={post.user.username} status={post.user.status} size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{post.user.username}</span>
              <span className="text-[11px] text-[var(--color-fog)]">· {post.timestamp}</span>
            </div>
            <span className="text-xs text-[var(--color-fog)] inline-flex items-center gap-1">
              <Gamepad2 size={11} /> {post.game}
            </span>
          </div>
        </Link>
        <div className="relative">
          <button onClick={() => setMenuOpen((v) => !v)} className="p-1.5 rounded-lg text-[var(--color-fog)] hover:text-white hover:bg-[var(--color-ink-raised)]">
            <MoreHorizontal size={18} />
          </button>
          {menuOpen && isOwner && (
            <div className="absolute right-0 top-9 z-10 w-36 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl overflow-hidden shadow-xl">
              <button
                onClick={deletePost}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-[#FF6A6A] hover:bg-[#2A1414]"
              >
                <Trash2 size={14} /> Delete post
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="aspect-[4/3] bg-[var(--color-ink-raised)]">
        <img src={post.image} alt={post.caption} className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="px-4 py-3 space-y-2.5">
        {actionError && <p role="alert" className="text-xs text-red-300">{actionError}</p>}
        <div className="flex items-center gap-4">
          <button onClick={toggleLike} className="flex items-center gap-1.5 group">
            <Heart
              size={22}
              className={liked ? 'fill-[var(--color-ember)] text-[var(--color-ember)]' : 'text-[var(--color-mist)] group-hover:text-[var(--color-ember)]'}
            />
            <span className="text-sm text-[var(--color-mist)]">{formatCount(likeCount)}</span>
          </button>
          <button className="flex items-center gap-1.5 group">
            <MessageCircle size={21} className="text-[var(--color-mist)] group-hover:text-[var(--color-signal)]" />
            <span className="text-sm text-[var(--color-mist)]">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 group">
            <Share2 size={20} className="text-[var(--color-mist)] group-hover:text-[var(--color-signal)]" />
          </button>
          <button onClick={() => setSaved((s) => !s)} className="ml-auto">
            <Bookmark size={20} className={saved ? 'fill-[var(--color-tier)] text-[var(--color-tier)]' : 'text-[var(--color-mist)]'} />
          </button>
        </div>

        <p className="text-sm leading-relaxed">
          <span className="font-semibold mr-1.5">{post.user.username}</span>
          {post.caption}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-[var(--color-signal)]">#{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
