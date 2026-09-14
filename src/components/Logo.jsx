export default function Logo({ size = 'md' }) {
  const textSize = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-xl'
  return (
    <div className="inline-flex items-center gap-2 select-none">
      <span className={`font-display font-bold tracking-tight ${textSize} leading-none`}>
        <span className="text-[#EDEFF5]">Squad</span>
        <span className="text-[var(--color-ember)]">Up</span>
      </span>
    </div>
  )
}
