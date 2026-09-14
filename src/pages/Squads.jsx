import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import SquadCard from '../components/SquadCard'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { games, skillLevels, platformsList } from '../data/mockData'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Squads() {
  const [squads, setSquads] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: '', game: games[0], description: '', maxPlayers: 5,
    skillLevel: skillLevels[0], roles: '', platform: platformsList[0], voiceChat: true, playTime: '',
  })
  const [error, setError] = useState('')
  const { token, user } = useAuth()

  useEffect(() => {
    api('/squads', { token }).then(({ squads: items }) => setSquads(items.map((squad) => ({
      ...squad, id: squad._id, title: squad.name, rank: squad.skillLevel, time: squad.playTime,
      owner: { ...squad.owner, id: squad.owner?._id, avatar: squad.owner?.profilePicture }, membersJoined: squad.members?.length || 0,
    })))).catch((err) => setError(err.message))
  }, [token])

  async function handleCreate(e) {
    e.preventDefault()
    setError('')
    try {
      const { squad } = await api('/squads', { token, method: 'POST', body: JSON.stringify({ name: form.name, game: form.game, description: form.description, maxMembers: Number(form.maxPlayers), skillLevel: form.skillLevel, roles: form.roles ? form.roles.split(',').map((role) => role.trim()) : ['Any'], platform: form.platform, voiceChat: form.voiceChat, playTime: form.playTime || 'Flexible' }) })
      setSquads((items) => [{ ...squad, id: squad._id, title: squad.name, rank: squad.skillLevel, time: squad.playTime, owner: { ...user, id: user?._id, avatar: user?.profilePicture }, membersJoined: 1 }, ...items])
      setModalOpen(false); setForm({ name: '', game: games[0], description: '', maxPlayers: 5, skillLevel: skillLevels[0], roles: '', platform: platformsList[0], voiceChat: true, playTime: '' })
    } catch (err) { setError(err.message) }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-0 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-semibold text-2xl">Squad Finder</h1>
          <p className="text-sm text-[var(--color-fog)] mt-1">Find teammates or post your own request</p>
        </div>
        <Button onClick={() => setModalOpen(true)} size="sm">
          <Plus size={16} /> New Squad
        </Button>
      </div>

      <div className="space-y-4">
        {error && <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
        {!error && squads.length === 0 && <div className="py-16 text-center"><p className="font-display font-semibold text-lg">No squad requests yet</p><p className="mt-1 text-sm text-[var(--color-fog)]">Create the first squad and find your teammates.</p></div>}
        {squads.map((squad) => <SquadCard key={squad.id} squad={squad} />)}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create a Squad Request">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-fog)]">Squad Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Need 2 players for Valorant Ranked"
              className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[var(--color-fog)]">Game</label>
              <select
                value={form.game}
                onChange={(e) => setForm((f) => ({ ...f, game: e.target.value }))}
                className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
              >
                {games.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-fog)]">Required Skill</label>
              <select
                value={form.skillLevel}
                onChange={(e) => setForm((f) => ({ ...f, skillLevel: e.target.value }))}
                className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
              >
                {skillLevels.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--color-fog)]">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              placeholder="Looking for chill but competitive players."
              className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[var(--color-fog)]">Max Players</label>
              <input
                type="number"
                min={1}
                max={10}
                value={form.maxPlayers}
                onChange={(e) => setForm((f) => ({ ...f, maxPlayers: e.target.value }))}
                className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-fog)]">Play Time</label>
              <input
                value={form.playTime}
                onChange={(e) => setForm((f) => ({ ...f, playTime: e.target.value }))}
                placeholder="Tonight 9 PM"
                className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--color-fog)]">Required Roles (comma separated)</label>
            <input
              value={form.roles}
              onChange={(e) => setForm((f) => ({ ...f, roles: e.target.value }))}
              placeholder="Controller, Initiator"
              className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
            />
          </div>

          <label className="flex items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={form.voiceChat}
              onChange={(e) => setForm((f) => ({ ...f, voiceChat: e.target.checked }))}
              className="w-4 h-4 accent-[var(--color-ember)]"
            />
            Voice chat required
          </label>

          <Button type="submit" className="w-full">Post Squad Request</Button>
        </form>
      </Modal>
    </div>
  )
}
