import { useSearchParams, Link } from 'react-router-dom'
import { useMemo } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import GamerCard from '../components/GamerCard'
import SquadCard from '../components/SquadCard'
import { gamers, games, squadRequests, posts } from '../data/mockData'

export default function Search() {
  const [params] = useSearchParams()
  const query = (params.get('q') || '').toLowerCase()

  const results = useMemo(() => {
    if (!query) return { gamerResults: [], gameResults: [], squadResults: [], postResults: [] }
    return {
      gamerResults: gamers.filter((g) => g.username.toLowerCase().includes(query)),
      gameResults: games.filter((g) => g.toLowerCase().includes(query)),
      squadResults: squadRequests.filter(
        (s) => s.title.toLowerCase().includes(query) || s.game.toLowerCase().includes(query)
      ),
      postResults: posts.filter((p) => p.caption.toLowerCase().includes(query) || p.game.toLowerCase().includes(query)),
    }
  }, [query])

  const { gamerResults, gameResults, squadResults, postResults } = results
  const totalResults = gamerResults.length + gameResults.length + squadResults.length + postResults.length

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-0 py-6">
      <h1 className="font-display font-semibold text-2xl mb-1">Search results</h1>
      <p className="text-sm text-[var(--color-fog)] mb-6">for "{params.get('q')}"</p>

      {!query || totalResults === 0 ? (
        <div className="text-center py-20">
          <SearchIcon size={28} className="mx-auto text-[var(--color-fog)]" />
          <p className="font-display font-semibold text-lg mt-3">No results found</p>
          <p className="text-sm text-[var(--color-fog)] mt-1">Try searching a gamer, game, or squad name.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {gamerResults.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold text-[var(--color-fog)] uppercase tracking-wide mb-3">Gamers</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gamerResults.map((g) => <GamerCard key={g.id} gamer={g} />)}
              </div>
            </section>
          )}

          {gameResults.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold text-[var(--color-fog)] uppercase tracking-wide mb-3">Games</h2>
              <div className="flex flex-wrap gap-2">
                {gameResults.map((g) => (
                  <span key={g} className="px-3 py-1.5 rounded-xl bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] text-sm">
                    {g}
                  </span>
                ))}
              </div>
            </section>
          )}

          {squadResults.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold text-[var(--color-fog)] uppercase tracking-wide mb-3">Squads</h2>
              <div className="space-y-4">
                {squadResults.map((s) => <SquadCard key={s.id} squad={s} />)}
              </div>
            </section>
          )}

          {postResults.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold text-[var(--color-fog)] uppercase tracking-wide mb-3">Posts</h2>
              <div className="space-y-2">
                {postResults.map((p) => (
                  <Link key={p.id} to={`/profile/${p.user.username}`} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] hover:border-[#3A4356]">
                    <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{p.user.username}</p>
                      <p className="text-xs text-[var(--color-fog)] truncate">{p.caption}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
