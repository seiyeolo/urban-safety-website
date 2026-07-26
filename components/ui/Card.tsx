import { cn } from '@/lib/utils'

type Padding = 'sm' | 'md' | 'lg'

const PADDINGS: Record<Padding, string> = {
  sm: 'p-5',
  md: 'p-7',
  lg: 'p-10',
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** hover 시 떠오르는 효과 — 클릭 가능한 카드에만 사용 */
  interactive?: boolean
  padding?: Padding
}

export function Card({
  interactive = false,
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-neutral-200 rounded-xl shadow-card',
        PADDINGS[padding],
        interactive &&
          'transition-all duration-300 hover:shadow-hover hover:-translate-y-1',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
