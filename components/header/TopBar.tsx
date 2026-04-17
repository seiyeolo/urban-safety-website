import Link from 'next/link'
import { Phone } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="bg-navy-900 text-white text-sm hidden md:block">
      <div className="container-main flex justify-between items-center py-2">
        <span className="text-navy-100 text-xs">
          대전광역시 서구 용문동 255-4 서우아파트 상가동 201호
        </span>
        <div className="flex items-center gap-4">
          <a
            href="tel:042-254-8060"
            className="flex items-center gap-1 text-navy-100 hover:text-white transition-colors"
          >
            <Phone size={12} />
            <span>042-254-8060</span>
          </a>
          <Link
            href="/education"
            className="bg-green-700 text-white text-xs px-3 py-1 rounded hover:bg-green-800 transition-colors"
          >
            교육 과정 보기
          </Link>
        </div>
      </div>
    </div>
  )
}