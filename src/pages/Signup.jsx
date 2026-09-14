import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { games, platformsList, skillLevels, rolesList } from '../data/mockData'

const steps = ['Account', 'Favorite Games', 'Platform', 'Skill & Role']

function ChipGrid({ options, selected, onToggle, multi = true }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = multi ? selected.includes(opt) : selected === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-colors flex items-center gap-1.5 ${
              isActive
                ? 'bg-[var(--color-ember)]/15 border-[var(--color-ember)] text-[var(--color-ember)]'
                : 'bg-[var(--color-ink-raised)] border-[var(--color-ink-border)] text-[var(--color-mist)] hover:border-[#3A4356]'
            }`}
          >
            {isActive && <Check size={13} />}
            {opt}
          </button>
        )
      })}
    </div>
  )
}

export default function Signup() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    username: '', email: '', password: '', confirmPassword: '', dob: '',
    favoriteGames: [], platform: '', skillLevel: '', role: '',
  })
  const navigate = useNavigate()
  const { register } = useAuth()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function toggleGame(game) {
    setForm((f) => ({
      ...f,
      favoriteGames: f.favoriteGames.includes(game)
        ? f.favoriteGames.filter((g) => g !== game)
        : [...f.favoriteGames, game],
    }))
  }

  async function handleNext(e) {
    e.preventDefault()
    setError('')
    if (step === 0 && form.password !== form.confirmPassword) return setError('Passwords do not match.')
    if (step < steps.length - 1) {
      setStep((s) => s + 1)
    } else {
      setSubmitting(true)
      try { await register({ ...form, platforms: form.platform ? [form.platform] : [], roles: form.role ? [form.role] : [] }); navigate('/home') } catch (err) { setError(err.message) } finally { setSubmitting(false) }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[var(--color-ink)]">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>

        <div className="flex items-center gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={s} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-[var(--color-ember)]' : 'bg-[var(--color-ink-border)]'}`} />
          ))}
        </div>

        <div className="bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] rounded-2xl p-6">
          <h1 className="font-display font-semibold text-xl">{steps[step]}</h1>
          <p className="text-sm text-[var(--color-fog)] mt-1">
            {step === 0 && 'Create your gamer account'}
            {step === 1 && 'Pick the games you play most — you can add more later'}
            {step === 2 && 'Where do you usually play?'}
            {step === 3 && 'Help us match you with the right squads'}
          </p>

          <form onSubmit={handleNext} className="mt-6 space-y-4">
            {error && <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</p>}
            {step === 0 && (
              <>
                <Field label="Username" value={form.username} onChange={(v) => update('username', v)} placeholder="ShadowX" />
                <Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} placeholder="you@example.com" />
                <Field label="Password" type="password" value={form.password} onChange={(v) => update('password', v)} />
                <Field label="Confirm Password" type="password" value={form.confirmPassword} onChange={(v) => update('confirmPassword', v)} />
                <Field label="Date of Birth" type="date" value={form.dob} onChange={(v) => update('dob', v)} />
              </>
            )}

            {step === 1 && <ChipGrid options={games} selected={form.favoriteGames} onToggle={toggleGame} />}

            {step === 2 && (
              <ChipGrid options={platformsList} selected={form.platform} onToggle={(v) => update('platform', v)} multi={false} />
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-medium text-[var(--color-fog)] mb-2">Skill Level</p>
                  <ChipGrid options={skillLevels} selected={form.skillLevel} onToggle={(v) => update('skillLevel', v)} multi={false} />
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--color-fog)] mb-2">Preferred Role</p>
                  <ChipGrid options={rolesList} selected={form.role} onToggle={(v) => update('role', v)} multi={false} />
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              {step > 0 && (
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setStep((s) => s - 1)}>
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1">
                {submitting ? 'Creating account...' : step < steps.length - 1 ? 'Continue' : 'Finish Setup'}
              </Button>
            </div>
          </form>
        </div>

        {step === 0 && (
          <p className="text-center text-sm text-[var(--color-fog)] mt-5">
            Already have an account? <Link to="/login" className="text-[var(--color-ember)] font-medium">Log in</Link>
          </p>
        )}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div>
      <label className="text-xs font-medium text-[var(--color-fog)]">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        required
        className="w-full mt-1.5 bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-ember)]"
      />
    </div>
  )
}
