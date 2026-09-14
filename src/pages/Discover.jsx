import { useEffect, useMemo, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import GamerCard from '../components/GamerCard'
import Button from '../components/Button'
import { gamers, games, platformsList, skillLevels, rolesList, availabilityList } from '../data/mockData'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

const filterGroups = [
  { key: 'game', label: 'Game', options: games.slice(0, 8) },
  { key: 'platform', label: 'Platform', options: platformsList },
  { key: 'skillLevel', label: 'Skill Level', options: skillLevels },
  { key: 'role', label: 'Role', options: rolesList },
  { key: 'availability', label: 'Availability', options: availabilityList },
]

export default function Discover() {
  const [filters, setFilters] = useState({})
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [gamerList, setGamerList] = useState(gamers)
  const { token } = useAuth()

  useEffect(() => {
    api('/users/discover', { token }).then(({ users }) => setGamerList(users.map((user) => ({
      ...user, id: user._id, avatar: user.profilePicture,
      game: user.favoriteGames?.[0] || 'Gaming', platform: user.platforms?.[0] || 'Any', role: user.roles?.[0] || 'Any',
    })))).catch(() => {})
  }, [token])

  function toggleFilter(group, value) {
    setFilters((f) => ({ ...f, [group]: f[group] === value ? null : value }))
  }

  const activeCount = Object.values(filters).filter(Boolean).length

  const filtered = useMemo(() => {
    return gamerList.filter((g) => {
      if (filters.game && g.game !== filters.game) return false
      if (filters.platform && g.platform !== filters.platform) return false
      if (filters.skillLevel && g.skillLevel !== filters.skillLevel) return false
      if (filters.role && g.role !== filters.role) return false
      return true
    })
  }, [filters, gamerList])

  const FiltersPanel = (
    <div className="space-y-6">
      {filterGroups.map((group) => (
        <div key={group.key}>
          <h3 className="text-xs font-semibold text-[var(--color-fog)] uppercase tracking-wide mb-2.5">{group.label}</h3>
          <div className="flex flex-wrap gap-2">
            {group.options.map((opt) => (
              <button
                key={opt}
                onClick={() => toggleFilter(group.key, opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  filters[group.key] === opt
                    ? 'bg-[var(--color-ember)]/15 border-[var(--color-ember)] text-[var(--color-ember)]'
                    : 'bg-[var(--color-ink-raised)] border-[var(--color-ink-border)] text-[var(--color-mist)] hover:border-[#3A4356]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      {activeCount > 0 && (
        <Button variant="ghost" size="sm" onClick={() => setFilters({})}>Clear filters</Button>
      )}
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-semibold text-2xl">Discover Gamers</h1>
          <p className="text-sm text-[var(--color-fog)] mt-1">Find players by game, skill and role</p>
        </div>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] text-sm"
        >
          <SlidersHorizontal size={15} /> Filters {activeCount > 0 && `(${activeCount})`}
        </button>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <div className="hidden lg:block">{FiltersPanel}</div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/70" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[var(--color-ink-card)] border-l border-[var(--color-ink-border)] p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-semibold">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}><X size={20} /></button>
              </div>
              {FiltersPanel}
            </div>
          </div>
        )}

        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display font-semibold text-lg">No gamers match those filters</p>
              <p className="text-sm text-[var(--color-fog)] mt-1">Try clearing a filter or two.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((g) => <GamerCard key={g.id} gamer={g} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
