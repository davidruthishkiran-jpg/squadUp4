import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Mic, MicOff, MapPin, Languages, Gamepad2 } from 'lucide-react'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import GameCard from '../components/GameCard'
import AchievementCard from '../components/AchievementCard'
import PostCard from '../components/PostCard'
import { currentUser, gamers, posts, achievements, gameShowcase, squadRequests } from '../data/mockData'
import SquadCard from '../components/SquadCard'

const tabs = ['Posts', 'Clips', 'Achievements', 'Games', 'Squads']

function findGamer(username) {
  if (currentUser.username === username) return currentUser
  return gamers.find((g) => g.username === username)
}

export default function Profile() {
  const { username } = useParams()
  const [activeTab, setActiveTab] = useState('Posts')
  const gamer = findGamer(username)
  const isSelf = gamer?.username === currentUser.username

  if (!gamer) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="font-display font-semibold text-lg">Gamer not found</p>
      </div>
    )
  }

  const userPosts = posts.filter((p) => p.user.username === gamer.username)
  const userSquads = squadRequests.filter((s) => s.owner.username === gamer.username)

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-0 py-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        <Avatar src={gamer.avatar} alt={gamer.username} status={gamer.status || 'online'} size="xl" />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display font-semibold text-2xl">{gamer.username}</h1>
            {isSelf ? (
              <Button variant="secondary" size="sm">Edit Profile</Button>
            ) : (
              <>
                <Button size="sm">Follow</Button>
                <Button variant="secondary" size="sm">Message</Button>
                <Button variant="secondary" size="sm">Find Squad</Button>
              </>
            )}
          </div>
          <p className="text-sm text-[var(--color-fog)] mt-1">{gamer.displayName || gamer.username}</p>
          {gamer.bio && <p className="text-sm mt-2.5 max-w-md leading-relaxed">{gamer.bio}</p>}
          {gamer.location && (
            <p className="text-xs text-[var(--color-fog)] mt-1.5 flex items-center gap-1">
              <MapPin size={12} /> {gamer.location}
            </p>
          )}

          <div className="flex items-center gap-6 mt-4">
            <Stat label="Posts" value={userPosts.length || 12} />
            <Stat label="Followers" value={gamer.followers} />
            <Stat label="Following" value={gamer.following ?? 180} />
            <Stat label="Squad Rating" value={gamer.squadRating ?? '4.5'} />
          </div>
        </div>
      </div>

      {isSelf && (
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <InfoBlock title="Favorite Games" value={gamer.favoriteGames?.join(', ')} icon={Gamepad2} />
          <InfoBlock title="Platforms" value={gamer.platforms?.join(', ')} />
          <InfoBlock title="Skill" value={gamer.skillLevel} />
          <InfoBlock title="Roles" value={gamer.roles?.join(', ')} />
          <InfoBlock title="Availability" value={gamer.availability} />
          <InfoBlock
            title="Mic"
            value={gamer.mic ? 'Available' : 'Not available'}
            icon={gamer.mic ? Mic : MicOff}
          />
          <InfoBlock title="Languages" value={gamer.languages?.join(', ')} icon={Languages} className="sm:col-span-2" />
        </div>
      )}

      <div className="flex items-center gap-1 mt-8 border-b border-[var(--color-ink-border)] overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-[var(--color-ember)] text-[#EDEFF5]'
                : 'border-transparent text-[var(--color-fog)] hover:text-[#EDEFF5]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 'Posts' && (
          userPosts.length ? (
            <div className="space-y-5 max-w-xl">
              {userPosts.map((p) => <PostCard key={p.id} post={p} />)}
            </div>
          ) : <EmptyState text="No posts yet" />
        )}

        {activeTab === 'Clips' && <EmptyState text="No clips uploaded yet" />}

        {activeTab === 'Achievements' && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {achievements.map((a) => <AchievementCard key={a.id} achievement={a} />)}
          </div>
        )}

        {activeTab === 'Games' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {gameShowcase.map((g) => <GameCard key={g.id} game={g} />)}
          </div>
        )}

        {activeTab === 'Squads' && (
          userSquads.length ? (
            <div className="space-y-4">
              {userSquads.map((s) => <SquadCard key={s.id} squad={s} />)}
            </div>
          ) : <EmptyState text="Not part of any squads yet" />
        )}
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="text-center sm:text-left">
      <div className="font-display font-semibold text-lg leading-none">{value}</div>
      <div className="text-xs text-[var(--color-fog)] mt-1">{label}</div>
    </div>
  )
}

function InfoBlock({ title, value, icon: Icon, className = '' }) {
  if (!value) return null
  return (
    <div className={`bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-xl p-3.5 ${className}`}>
      <p className="text-[11px] text-[var(--color-fog)] uppercase tracking-wide flex items-center gap-1.5">
        {Icon && <Icon size={11} />} {title}
      </p>
      <p className="text-sm mt-1">{value}</p>
    </div>
  )
}

function EmptyState({ text }) {
  return (
    <div className="text-center py-16">
      <p className="text-sm text-[var(--color-fog)]">{text}</p>
    </div>
  )
}
