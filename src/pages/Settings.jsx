import { useState } from 'react'
import Button from '../components/Button'
import { currentUser, games, platformsList, skillLevels } from '../data/mockData'

const sections = ['Account', 'Profile', 'Privacy', 'Notifications', 'Appearance']

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-6 rounded-full relative transition-colors ${checked ? 'bg-[var(--color-ember)]' : 'bg-[var(--color-ink-border)]'}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-4.5 left-0.5' : 'left-0.5'}`} />
    </button>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-[var(--color-ink-border)] last:border-0">
      <span className="text-sm">{label}</span>
      {children}
    </div>
  )
}

export default function Settings() {
  const [active, setActive] = useState('Account')
  const [privacy, setPrivacy] = useState({ privateAccount: false, messagesFromAnyone: true, squadInvitesFromAnyone: true })
  const [notifs, setNotifs] = useState({ likes: true, comments: true, messages: true, squadInvites: true })
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-0 py-6">
      <h1 className="font-display font-semibold text-2xl mb-6">Settings</h1>

      <div className="grid lg:grid-cols-[180px_1fr] gap-8">
        <nav className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-none">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`px-3.5 py-2.5 rounded-xl text-sm font-medium text-left whitespace-nowrap ${
                active === s ? 'bg-[var(--color-ink-card)] text-white' : 'text-[var(--color-fog)] hover:bg-[var(--color-ink-raised)]'
              }`}
            >
              {s}
            </button>
          ))}
        </nav>

        <div className="bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-2xl p-5">
          {active === 'Account' && (
            <div className="space-y-4">
              <Field label="Username" defaultValue={currentUser.username} />
              <Field label="Email" defaultValue="arjun.r@example.com" type="email" />
              <Field label="Password" type="password" placeholder="••••••••" />
              <Button size="sm">Save Changes</Button>
            </div>
          )}

          {active === 'Profile' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={currentUser.avatar} alt="" className="w-16 h-16 rounded-2xl" />
                <Button variant="secondary" size="sm">Change Photo</Button>
              </div>
              <Field label="Bio" defaultValue={currentUser.bio} textarea />
              <div>
                <label className="text-xs font-medium text-[var(--color-fog)]">Games</label>
                <select className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm">
                  {games.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--color-fog)]">Platform</label>
                <select className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm">
                  {platformsList.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--color-fog)]">Skill Level</label>
                <select className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm">
                  {skillLevels.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <Button size="sm">Save Changes</Button>
            </div>
          )}

          {active === 'Privacy' && (
            <div>
              <Row label="Private account">
                <Toggle checked={privacy.privateAccount} onChange={(v) => setPrivacy((p) => ({ ...p, privateAccount: v }))} />
              </Row>
              <Row label="Anyone can message me">
                <Toggle checked={privacy.messagesFromAnyone} onChange={(v) => setPrivacy((p) => ({ ...p, messagesFromAnyone: v }))} />
              </Row>
              <Row label="Anyone can invite me to squads">
                <Toggle checked={privacy.squadInvitesFromAnyone} onChange={(v) => setPrivacy((p) => ({ ...p, squadInvitesFromAnyone: v }))} />
              </Row>
            </div>
          )}

          {active === 'Notifications' && (
            <div>
              <Row label="Likes">
                <Toggle checked={notifs.likes} onChange={(v) => setNotifs((n) => ({ ...n, likes: v }))} />
              </Row>
              <Row label="Comments">
                <Toggle checked={notifs.comments} onChange={(v) => setNotifs((n) => ({ ...n, comments: v }))} />
              </Row>
              <Row label="Messages">
                <Toggle checked={notifs.messages} onChange={(v) => setNotifs((n) => ({ ...n, messages: v }))} />
              </Row>
              <Row label="Squad invitations">
                <Toggle checked={notifs.squadInvites} onChange={(v) => setNotifs((n) => ({ ...n, squadInvites: v }))} />
              </Row>
            </div>
          )}

          {active === 'Appearance' && (
            <Row label="Dark mode">
              <Toggle checked={darkMode} onChange={setDarkMode} />
            </Row>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, defaultValue, placeholder, type = 'text', textarea = false }) {
  return (
    <div>
      <label className="text-xs font-medium text-[var(--color-fog)]">{label}</label>
      {textarea ? (
        <textarea
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={3}
          className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm resize-none"
        />
      ) : (
        <input
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
          className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm"
        />
      )}
    </div>
  )
}
