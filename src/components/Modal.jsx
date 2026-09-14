import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} max-h-[85vh] overflow-y-auto rounded-2xl bg-[var(--color-ink-card)] border border-[var(--color-ink-border)] shadow-2xl`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-ink-border)] sticky top-0 bg-[var(--color-ink-card)]">
          <h2 className="font-display font-semibold text-lg">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[var(--color-fog)] hover:text-white hover:bg-[var(--color-ink-raised)]">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
