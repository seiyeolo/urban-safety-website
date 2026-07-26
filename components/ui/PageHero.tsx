import { cn } from '@/lib/utils'
import { Breadcrumb, type Crumb } from './Breadcrumb'

interface PageHeroProps {
  title: string
  description?: string
  /** 제목 위 작은 라벨 */
  eyebrow?: string
  breadcrumb?: Crumb[]
  /** 히어로 하단에 붙일 CTA 등 */
  children?: React.ReactNode
  className?: string
}

export function PageHero({
  title,
  description,
  eyebrow,
  breadcrumb,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'bg-gradient-to-b from-brand-950 to-brand-600 text-white',
        'px-6 pt-20 pb-16 md:pt-28 md:pb-20',
        'border-b border-white/10',
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto">
        {breadcrumb && breadcrumb.length > 0 && (
          <Breadcrumb items={breadcrumb} onDark className="mb-8 justify-center" />
        )}

        <div className="text-center">
          {eyebrow && (
            <p className="text-accent-400 font-semibold tracking-wide mb-3 text-base">
              {eyebrow}
            </p>
          )}

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">{title}</h1>

          {description && (
            <p className="text-brand-200 text-lg md:text-xl leading-relaxed max-w-[700px] mx-auto">
              {description}
            </p>
          )}

          {children && <div className="mt-8 flex flex-wrap gap-4 justify-center">{children}</div>}
        </div>
      </div>
    </section>
  )
}
