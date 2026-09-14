const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none'

const variants = {
  primary: 'bg-[var(--color-ember)] text-[#160A05] hover:bg-[#FF7F52] active:bg-[var(--color-ember-dim)]',
  secondary: 'bg-[var(--color-ink-card)] text-[#EDEFF5] border border-[var(--color-ink-border)] hover:border-[#3A4356] hover:bg-[var(--color-ink-raised)]',
  ghost: 'text-[var(--color-fog)] hover:text-[#EDEFF5] hover:bg-[var(--color-ink-raised)]',
  signal: 'bg-[var(--color-signal)] text-[#04211C] hover:brightness-110',
  danger: 'text-[#FF6A6A] hover:bg-[#2A1414]',
}

const sizes = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-6 py-3',
}

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
