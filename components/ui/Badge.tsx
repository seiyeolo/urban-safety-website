import { cn } from '@/lib/utils'

type Tone = 'brand' | 'cta' | 'accent' | 'neutral' | 'success' | 'danger'

/* accent(라임)는 흰 배경 대비 1.6:1이라 텍스트로 못 씀 → 어두운 텍스트를 얹는 형태로만 사용 */
const TONES: Record<Tone, string> = {
  brand: 'bg-brand-100 text-brand-700',
  cta: 'bg-cta-50 text-cta-800',
  accent: 'bg-accent-300 text-brand-900',
  neutral: 'bg-neutral-100 text-neutral-700',
  success: 'bg-success-50 text-success-600',
  danger: 'bg-danger-50 text-danger-600',
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Badge({ tone = 'brand', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-sm font-semibold tracking-wide',
        TONES[tone],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
