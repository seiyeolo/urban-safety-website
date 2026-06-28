import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { NAV_ITEMS } from './constants'

interface MainNavProps {
  activeMenu: string | null
  onMenuEnter: (href: string) => void
  onMenuLeave: () => void
}

export default function MainNav({ activeMenu, onMenuEnter, onMenuLeave }: MainNavProps) {
  return (
    <nav className="flex items-center gap-2" role="navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = activeMenu === item.href
        return (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() => onMenuEnter(item.href)}
            onMouseLeave={onMenuLeave}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded border-2 whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'border-navy-900 bg-navy-50 text-navy-900 shadow-sm'
                  : 'border-gray-300 text-gray-700 hover:border-navy-900 hover:bg-navy-50 hover:text-navy-900 hover:shadow-sm'
              }`}
            >
              {item.label}
              {item.children && (
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isActive ? 'rotate-180' : ''
                  }`}
                />
              )}
            </Link>

            {/* 드롭다운 — pt-2 투명 브릿지로 hover 끊김 방지 */}
            {item.children && isActive && (
              <div className="absolute top-full left-0 pt-2 z-50">
                <div className="bg-white shadow-xl border border-gray-100 rounded-lg min-w-48 py-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-5 py-2.5 text-sm text-gray-600 hover:text-navy-900 hover:bg-navy-50 transition-colors whitespace-nowrap"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}