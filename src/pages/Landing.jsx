import { Link } from 'react-router-dom'
import { Users, MessageSquare, Image, Trophy, Compass, UsersRound } from 'lucide-react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { gamers, posts } from '../data/mockData'

const features = [
  { icon: Users, title: 'Gamer Profiles', desc: 'Showcase your games, ranks, roles and hours played in one place.' },
  { icon: UsersRound, title: 'Squad Finder', desc: 'Post what you need and get matched with players who fit the role.' },
  { icon: MessageSquare, title: 'Real-time Chat', desc: 'Coordinate with your squad before you even queue up.' },
  { icon: Image, title: 'Gaming Posts', desc: 'Share clips, screenshots and achievements with people who get it.' },
  { icon: Compass, title: 'Communities', desc: 'Join hubs built around the games you already play.' },
  { icon: Trophy, title: 'Achievements', desc: 'Track milestones and show off your progress on your profile.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      <header className="flex items-center justify-between px-6 lg:px-10 py-5 max-w-7xl mx-auto">
        <Logo size="lg" />
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-[var(--color-mist)] hover:text-white">Log in</Link>
          <Link to="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <section className="px-6 lg:px-10 pt-12 pb-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-display font-bold text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Find your squad.
          </h1>
          <p className="mt-5 text-lg text-[var(--color-mist)] max-w-md leading-relaxed">
            Connect with gamers, share your best moments, and build your ultimate gaming squad.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <Link to="/signup"><Button size="lg">Get Started</Button></Link>
            <Link to="/discover"><Button variant="secondary" size="lg">Explore Gamers</Button></Link>
          </div>
          <div className="flex items-center gap-4 mt-10">
            <div className="flex -space-x-3">
              {gamers.slice(0, 5).map((g) => (
                <img key={g.id} src={g.avatar} alt={g.username} className="w-9 h-9 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-ink-raised)]" />
              ))}
            </div>
            <p className="text-sm text-[var(--color-fog)]">12,400+ gamers already squadded up</p>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-[var(--color-ink-border)] bg-[var(--color-ink-card)]">
              <img src={posts[0].image} alt="" className="w-full h-40 object-cover" />
              <div className="p-3">
                <p className="text-xs font-semibold">{posts[0].user.username}</p>
                <p className="text-[11px] text-[var(--color-fog)]">{posts[0].game}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--color-ink-border)] bg-[var(--color-ink-card)] p-4 mt-8">
              <p className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--color-tier)]/15 text-[var(--color-tier)] inline-block">
                Valorant
              </p>
              <p className="text-sm font-semibold mt-2">Need 2 for Ranked</p>
              <p className="text-xs text-[var(--color-fog)] mt-1">Diamond · Tonight 9 PM</p>
              <Button size="sm" className="mt-3 w-full">Join Squad</Button>
            </div>
            <div className="rounded-2xl border border-[var(--color-ink-border)] bg-[var(--color-ink-card)] p-4">
              <p className="text-sm font-semibold">ShadowX</p>
              <p className="text-xs text-[var(--color-signal)] mt-1">● Online</p>
              <p className="text-xs text-[var(--color-fog)] mt-2">"Perfect 🔥 see you at 9"</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[var(--color-ink-border)] bg-[var(--color-ink-card)] -mt-6">
              <img src={posts[4].image} alt="" className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-xs font-semibold">{posts[4].user.username}</p>
                <p className="text-[11px] text-[var(--color-fog)]">4.8K likes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-16 border-t border-[var(--color-ink-border)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-semibold text-2xl mb-10">Everything your squad needs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 rounded-2xl border border-[var(--color-ink-border)] bg-[var(--color-ink-card)]">
                <Icon size={22} className="text-[var(--color-ember)]" />
                <h3 className="font-display font-semibold mt-3">{title}</h3>
                <p className="text-sm text-[var(--color-fog)] mt-1.5 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 lg:px-10 py-8 border-t border-[var(--color-ink-border)] text-center text-xs text-[var(--color-fog)]">
        SquadUp — Find gamers. Build your squad. Share your gaming life.
      </footer>
    </div>
  )
}
