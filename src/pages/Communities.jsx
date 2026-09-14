import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import Button from '../components/Button'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Communities() {
  const [communities, setCommunities] = useState([])
  const [error, setError] = useState('')
  const { token } = useAuth()
  useEffect(() => { api('/communities', { token }).then(({ communities: items }) => setCommunities(items)).catch((err) => setError(err.message)) }, [token])
  async function join(id) { try { await api(`/communities/${id}/join`, { token, method: 'POST' }); setCommunities((items) => items.map((item) => item._id === id ? { ...item, joined: true, members: [...item.members, 'me'] } : item)) } catch (err) { setError(err.message) } }
  return <div className="max-w-3xl mx-auto px-4 lg:px-0 py-6"><h1 className="font-display font-semibold text-2xl mb-1">Communities</h1><p className="text-sm text-[var(--color-fog)] mb-6">Hubs created by the SquadUp community</p>{error && <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}{communities.length ? <div className="grid sm:grid-cols-2 gap-4">{communities.map((community) => <article key={community._id} className="rounded-2xl overflow-hidden border border-[var(--color-ink-border)] bg-[var(--color-ink-card)]"><div className="h-20 bg-[var(--color-ink-raised)]" style={community.banner ? { backgroundImage: `url(${community.banner})`, backgroundSize: 'cover' } : {}} /><div className="p-4"><h2 className="font-display font-semibold">{community.name}</h2><p className="mt-1 flex items-center gap-1 text-xs text-[var(--color-fog)]"><Users size={11} />{community.members?.length || 0} members</p><p className="mt-3 text-sm text-[var(--color-mist)]">{community.description}</p><Button size="sm" variant={community.joined ? 'secondary' : 'primary'} className="mt-4 w-full" onClick={() => join(community._id)}>{community.joined ? 'Joined' : 'Join community'}</Button></div></article>)}</div> : <div className="rounded-2xl border border-dashed border-[var(--color-ink-border)] py-16 text-center"><p className="font-display font-semibold">No communities yet</p><p className="mt-1 text-sm text-[var(--color-fog)]">The first community will appear here when it is created.</p></div>}</div>
}
