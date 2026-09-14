import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

function presentPost(post) {
  return {
    ...post,
    id: post._id,
    image: post.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80',
    likes: Array.isArray(post.likes) ? post.likes.length : post.likes,
    comments: Array.isArray(post.comments) ? post.comments.length : post.comments,
    liked: false, saved: false,
    timestamp: new Date(post.createdAt).toLocaleDateString(),
    user: { ...post.user, id: post.user?._id, avatar: post.user?.profilePicture },
  }
}

function PostSkeleton() {
  return (
    <div className="bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-2xl overflow-hidden animate-pulse">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-8 h-8 rounded-xl bg-[var(--color-ink-raised)]" />
        <div className="h-3 w-24 bg-[var(--color-ink-raised)] rounded" />
      </div>
      <div className="aspect-[4/3] bg-[var(--color-ink-raised)]" />
      <div className="px-4 py-3 space-y-2">
        <div className="h-3 w-20 bg-[var(--color-ink-raised)] rounded" />
        <div className="h-3 w-3/4 bg-[var(--color-ink-raised)] rounded" />
      </div>
    </div>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [postList, setPostList] = useState([])
  const [error, setError] = useState('')
  const { token } = useAuth()

  useEffect(() => {
    api('/posts', { token }).then(({ posts }) => setPostList(posts.map(presentPost))).catch((err) => { setError(err.message); setPostList([]) }).finally(() => setLoading(false))
  }, [token])

  function handleDelete(id) {
    setPostList((p) => p.filter((post) => post.id !== id))
  }

  return (
    <div className="max-w-xl mx-auto px-4 lg:px-0 py-6 space-y-5">
      {loading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}

      {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">Live feed unavailable. {error}</p>}

      {!loading && postList.length === 0 && (
        <div className="text-center py-20">
          <p className="font-display font-semibold text-lg">Your feed is quiet</p>
          <p className="text-sm text-[var(--color-fog)] mt-1">Follow more gamers to see their posts here.</p>
        </div>
      )}

      {!loading && postList.map((post) => (
        <PostCard key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  )
}
