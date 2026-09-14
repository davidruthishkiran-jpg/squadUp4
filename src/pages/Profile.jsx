import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Gamepad2, MapPin } from 'lucide-react'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import PostCard from '../components/PostCard'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { username } = useParams()
  const { token, user: sessionUser } = useAuth()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    setError(''); setUser(null)
    Promise.all([api(`/users/${username}`, { token }), api('/posts', { token })])
      .then(([profile, feed]) => { setUser(profile.user); setPosts(feed.posts.filter((post) => post.user?.username === profile.user.username)) })
      .catch((err) => setError(err.message))
  }, [username, token])

  if (error) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p className="font-display font-semibold text-lg">Gamer not found</p><p className="text-sm text-[var(--color-fog)] mt-1">{error}</p></div>
  if (!user) return <div className="max-w-2xl mx-auto px-4 py-20 text-center text-sm text-[var(--color-fog)]">Loading profile…</div>
  const isSelf = user._id === sessionUser?._id
  const favoriteGames = user.favoriteGames || []

  return <div className="max-w-3xl mx-auto px-4 lg:px-0 py-6">
    <section className="rounded-2xl border border-[var(--color-ink-border)] bg-[var(--color-ink-card)] p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        <Avatar src={user.profilePicture} alt={user.username} status={user.status} size="xl" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3"><h1 className="font-display font-semibold text-2xl">{user.username}</h1>{isSelf ? <Link to="/settings"><Button variant="secondary" size="sm">Edit profile</Button></Link> : <Link to={`/messages?user=${user._id}&username=${encodeURIComponent(user.username)}`}><Button size="sm">Message</Button></Link>}</div>
          <p className="text-sm text-[var(--color-fog)] mt-1">{user.displayName || user.username}</p>
          {user.bio && <p className="text-sm mt-3 leading-relaxed">{user.bio}</p>}
          {user.location && <p className="mt-2 flex items-center gap-1 text-xs text-[var(--color-fog)]"><MapPin size={12} />{user.location}</p>}
          <div className="grid grid-cols-3 gap-3 mt-5 max-w-sm"><Stat value={posts.length} label="Posts" /><Stat value={user.followerCount || 0} label="Followers" /><Stat value={user.followingCount || 0} label="Following" /></div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">{favoriteGames.map((game) => <span key={game} className="rounded-lg border border-[var(--color-ink-border)] bg-[var(--color-ink-raised)] px-2.5 py-1 text-xs"><Gamepad2 size={12} className="mr-1 inline" />{game}</span>)}</div>
    </section>
    <section className="mt-7"><h2 className="font-display font-semibold text-lg">Posts</h2>{posts.length ? <div className="mt-4 space-y-5 max-w-xl">{posts.map((post) => <PostCard key={post._id} post={{ ...post, id: post._id, image: post.image, likes: post.likes?.length || 0, comments: post.comments?.length || 0, tags: post.tags || [], timestamp: new Date(post.createdAt).toLocaleDateString(), user: { ...post.user, id: post.user?._id, avatar: post.user?.profilePicture } }} />)}</div> : <Empty text={isSelf ? 'Your posts will appear here after you share your first gaming moment.' : 'No posts yet.'} />}</section>
  </div>
}

function Stat({ value, label }) { return <div><p className="font-display text-lg font-semibold">{value}</p><p className="text-xs text-[var(--color-fog)]">{label}</p></div> }
function Empty({ text }) { return <div className="mt-4 rounded-2xl border border-dashed border-[var(--color-ink-border)] py-14 text-center text-sm text-[var(--color-fog)]">{text}</div> }
