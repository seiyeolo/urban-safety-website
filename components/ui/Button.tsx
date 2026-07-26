import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'white' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

/* CTA는 cta-700(흰 텍스트 5.48:1 AA). 로고 원본 cta-500은 대비 3.37:1이라 배경으로 쓰지 않음 */
const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-cta-700 text-white hover:bg-cta-800 hover:-translate-y-px hover:shadow-cta',
  secondary:
    'bg-transparent text-brand-600 border-2 border-brand-600 hover:bg-brand-600 hover:text-white hover:-translate-y-px',
  white:
    'bg-white text-brand-600 border border-neutral-200 hover:bg-brand-50 hover:-translate-y-px',
  ghost:
    'bg-transparent text-brand-600 hover:bg-brand-50',
}

const SIZES: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm gap-1.5',
  md: 'px-7 py-3.5 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2',
}

const BASE =
  'inline-flex items-center justify-center font-semibold rounded-md no-underline cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined
  }

type LinkProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> & {
    href: string
  }

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)

  if (typeof props.href === 'string') {
    const { href, ...anchorRest } = rest as LinkProps
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonProps)}>
      {children}
    </button>
  )
}
