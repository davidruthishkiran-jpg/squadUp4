import { useState } from 'react'
import { Plus } from 'lucide-react'
import SquadCard from '../components/SquadCard'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { squadRequests, games, skillLevels, platformsList } from '../data/mockData'

export default function Squads() {
  const [squads, setSquads] = useState(squadRequests)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: '', game: games[0], description: '', maxPlayers: 5,
    skillLevel: skillLevels[0], roles: '', platform: platformsList[0], voiceChat: true, playTime: '',
  })

  function handleCreate(e) {
    e.preventDefault()
    const newSquad = {
      id: `s${Date.now()}`,
      title: form.name,
      game: form.game,
      rank: form.skillLevel,
      roles: form.roles ? form.roles.split(',').map((r) => r.trim()) : ['Any'],
      playersNeeded: form.maxPlayers,
      voiceChat: form.voiceChat,
      time: form.playTime || 'Flexible',
      description: form.description,
      owner: squadRequests[2].owner,
      membersJoined: 1,
      maxMembers: Number(form.maxPlayers),
    }
    setSquads((s) => [newSquad, ...s])
    setModalOpen(false)
    setForm({ name: '', game: games[0], description: '', maxPlayers: 5, skillLevel: skillLevels[0], roles: '', platform: platformsList[0], voiceChat: true, playTime: '' })
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
