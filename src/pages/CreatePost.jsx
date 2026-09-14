import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImagePlus, MapPin } from 'lucide-react'
import Button from '../components/Button'
import { currentUser, games } from '../data/mockData'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function CreatePost() {
  const [caption, setCaption] = useState('')
  const [game, setGame] = useState(games[0])
  const [tags, setTags] = useState('')
  const [location, setLocation] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [media, setMedia] = useState('')
  const [error, setError] = useState('')
  const [publishing, setPublishing] = useState(false)
  const navigate = useNavigate()
  const { token, user } = useAuth()

  function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => { setMedia(reader.result); setImagePreview(reader.result) }
    reader.readAsDataURL(file)
  }

  async function handlePublish(e) {
    e.preventDefault()
    setError(''); setPublishing(true)
    try {
      await api('/posts', { token, method: 'POST', body: JSON.stringify({ image: media, caption, game, tags: tags.split(/\s+/).filter(Boolean).map((tag) => tag.replace(/^#/, '')), location }) })
      navigate('/home')
    } catch (err) { setError(err.message) } finally { setPublishing(false) }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-0 py-6">
      <h1 className="font-display font-semibold text-2xl mb-6">Create Post</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handlePublish} className="space-y-4">
          {error && <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</p>}
          <label className="block aspect-video rounded-2xl border-2 border-dashed border-[var(--color-ink-border)] hover:border-[var(--color-ember)] cursor-pointer flex flex-col items-center justify-center gap-2 bg-[var(--color-ink-card)] transition-colors overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <ImagePlus size={28} className="text-[var(--color-fog)]" />
                <span className="text-sm text-[var(--color-fog)]">Upload image or video</span>
              </>
            )}
            <input type="file" accept="image/*,video/*" onChange={handleImageChange} className="hidden" />
          </label>

          <div>
            <label className="text-xs font-medium text-[var(--color-fog)]">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              placeholder="Finally hit Immortal 🔥"
              className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)] resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--color-fog)]">Game</label>
            <select
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
            >
              {games.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--color-fog)]">Tags</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="#valorant #ranked #gaming"
              className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--color-fog)] flex items-center gap-1">
              <MapPin size={12} /> Location (optional)
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Hyderabad, IN"
              className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
            />
          </div>

          <Button type="submit" disabled={publishing} className="w-full">{publishing ? 'Publishing...' : 'Publish Post'}</Button>
        </form>

        <div>
          <p className="text-xs font-medium text-[var(--color-fog)] uppercase tracking-wide mb-3">Preview</p>
          <div className="bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3">
              <img src={user?.profilePicture || currentUser.avatar} alt="" className="w-8 h-8 rounded-xl" />
              <div>
                <p className="text-sm font-semibold">{user?.username || currentUser.username}</p>
                <p className="text-xs text-[var(--color-fog)]">{game}</p>
              </div>
            </div>
            <div className="aspect-video bg-[var(--color-ink-raised)] flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-[var(--color-fog)]">No media yet</span>
              )}
            </div>
            <div className="px-4 py-3">
              <p className="text-sm">
                <span className="font-semibold mr-1.5">{user?.username || currentUser.username}</span>
                {caption || 'Your caption will appear here...'}
              </p>
              {tags && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.split(' ').filter(Boolean).map((t) => (
                    <span key={t} className="text-xs text-[var(--color-signal)]">{t.startsWith('#') ? t : `#${t}`}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
