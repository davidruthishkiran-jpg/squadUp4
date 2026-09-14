import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function SearchBar({ className = '', placeholder = 'Search gamers, games, squads...' }) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (value.trim()) navigate(`/search?q=${encodeURIComponent(value.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-fog)]" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-full bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder:text-[var(--color-fog)] focus:outline-none focus:border-[var(--color-ember)] transition-colors"
      />
    </form>
  )
}
