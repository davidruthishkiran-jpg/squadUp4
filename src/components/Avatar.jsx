import StatusIndicator from './StatusIndicator'

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-11 h-11',
  lg: 'w-16 h-16',
  xl: 'w-28 h-28',
}

export default function Avatar({ src, alt, size = 'md', status, className = '' }) {
  return (
    <div className={`relative shrink-0 ${sizes[size]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full rounded-2xl object-cover bg-[var(--color-ink-raised)] border border-[var(--color-ink-border)]"
      />
      {status && (
        <span className="absolute -bottom-1 -right-1">
          <StatusIndicator status={status} size={size === 'xl' || size === 'lg' ? 'md' : 'sm'} ring />
        </span>
      )}
    </div>
  )
}
