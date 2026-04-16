export const NAV_ITEMS = [
  {
    label: '센터소개',
    href: '/about',
    children: [
      { label: '인사말', href: '/about/greeting' },
      { label: '설립 취지와 비전', href: '/about/vision' },
      { label: '핵심 운영분야', href: '/about/fields' },
      { label: '연혁', href: '/about/history' },
      { label: '운영진/전문위원', href: '/about/members' },
      { label: '협력 네트워크', href: '/about/network' },
      { label: '오시는 길', href: '/about/location' },
    ],
  },
  {
    label: '핵심분야',
    href: '/fields',
    children: [
      { label: '범죄예방', href: '/fields/crime-prevention' },
      { label: '생활안전', href: '/fields/life-safety' },
    ],
  },
  {
    label: '민간자격증',
    href: '/certificates',
    children: [
      { label: '자격증 안내', href: '/certificates' },
      { label: '보이스피싱 예방지도사', href: '/certificates/voice-phishing' },
      { label: '생활안전지도사', href: '/certificates/life-safety' },
    ],
  },
  {
    label: '교육안내',
    href: '/education',
    children: [
      { label: '전체 교육과정', href: '/education' },
      { label: '온라인 교육', href: '/education/online' },
      { label: '오프라인 교육', href: '/education/offline' },
      { label: '기관·단체 맞춤형', href: '/education/group' },
    ],
  },
  {
    label: '사업',
    href: '/notice',
    children: [
      { label: '공지사항', href: '/notice' },
      { label: '사업 일정', href: '/notice/schedule' },
      { label: '사업 성과', href: '/notice/results' },
      { label: '언론보도', href: '/notice/press' },
    ],
  },
  {
    label: '자료실',
    href: '/notice/downloads',
    children: [
      { label: '자료실', href: '/notice/downloads' },
    ],
  },
  {
    label: '문의',
    href: '/contact',
    children: [
      { label: '일반 문의', href: '/contact' },
      { label: '교육 신청', href: '/contact/education' },
      { label: '단체 교육 문의', href: '/contact/group' },
      { label: '협력 제안', href: '/contact/partner' },
    ],
  },
]

export type NavItem = {
  label: string
  href: string
  children?: Array<{
    label: string
    href: string
  }>
}