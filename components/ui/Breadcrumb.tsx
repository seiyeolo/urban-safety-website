import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: Crumb[]
  /** 어두운 히어로 배경 위에 놓을 때 true */
  onDark?: boolean
  className?: string
}

export function Breadcrumb({ items, onDark = false, className }: BreadcrumbProps) {
  const muted = onDark ? 'text-brand-200' : 'text-neutral-600'
  const current = onDark ? 'text-white' : 'text-brand-700'

  return (
    <nav aria-label="현재 위치" className={cn('flex items-center gap-2 text-sm', className)}>
      <ol className="flex items-center gap-2 list-none p-0 m-0">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className={cn(muted, 'no-underline hover:text-white')}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast ? `${current} font-medium` : muted)}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className={cn('w-3.5 h-3.5 opacity-50', muted)} aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
