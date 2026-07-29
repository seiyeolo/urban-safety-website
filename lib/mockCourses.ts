import { BookOpen, ShieldCheck, Users, Clock, FileText, ClipboardCheck, UserCheck } from 'lucide-react'

export type CourseStatus = 'open' | 'invite_only' | 'preparing'
export type LessonStatus = 'completed' | 'current' | 'locked'

export const dashboardInspiration = {
  source: 'Design4Users dashboard design concepts',
  url: 'https://design4users.com/dashboard-design-concepts/',
  appliedPatterns: [
    'clear KPI cards',
    'cohesive workspace grid',
    'course/progress widgets',
    'advanced table-style admin filters',
    'clean minimal cards with strong information hierarchy',
  ],
}

export const courseCategories = ['전체', '자격증 과정', '오프라인 보충', '기관교육', '준비 중']

/**
 * 강의자료 한 건.
 *
 * href가 없으면 화면에 '준비 중'으로 표시된다 — 파일이 아직 없는데 링크처럼
 * 보이면 눌러보고 실패하게 되므로, 있을 때만 다운로드로 만든다.
 *
 * 주소는 관리자 자료실(/admin/files)에 올린 파일의 공개 URL이다.
 * 같은 파일을 다시 올리면 저장 이름이 바뀌므로(덮어쓰기 방지) 여기도 갱신해야 한다.
 * 영상 ID를 lessonVideos.ts에 적어두는 것과 같은 방식이다.
 */
export interface LessonMaterial {
  label: string
  href?: string
}

export const voicePhishingLessons = [
  {
    id: 'lesson-01',
    order: 1,
    title: '보이스피싱 주요 피해 사례 (1)',
    duration: '24분',
    status: 'current' as LessonStatus,
    summary: '실제 피해 사례를 통해 보이스피싱이 어떻게 시작되고 진행되는지 살펴봅니다. (강의: 김창호 교수)',
    materials: [{ label: '강의 요약 자료' }] as LessonMaterial[],
  },
  {
    id: 'lesson-02',
    order: 2,
    title: '보이스피싱 주요 피해 사례 (2)',
    duration: '25분',
    status: 'locked' as LessonStatus,
    summary: '이어지는 피해 사례 분석으로 유형별 수법과 위험 신호를 구체적으로 파악합니다. (강의: 김창호 교수)',
    materials: [{ label: '위험 신호 체크리스트' }] as LessonMaterial[],
  },
  {
    id: 'lesson-03',
    order: 3,
    title: '보이스피싱 기본과정',
    duration: '15분',
    status: 'locked' as LessonStatus,
    summary: '보이스피싱의 기본 개념과 예방 원칙을 정리합니다.',
    materials: [{ label: '예방 안내 자료' }] as LessonMaterial[],
  },
  {
    id: 'lesson-04',
    order: 4,
    title: '보이스피싱 심화과정',
    duration: '49분',
    status: 'locked' as LessonStatus,
    summary: '기관사칭·대면편취 등 신종 수법과 유형별 대응 요령을 상세히 다루는 심화 학습으로 과정을 마무리합니다.',
    materials: [{ label: '심화과정 강의안' }] as LessonMaterial[],
  },
  {
    id: 'lesson-05',
    order: 5,
    title: '보이스피싱 피해자 구제',
    duration: '30분',
    status: 'locked' as LessonStatus,
    summary:
      '피해가 발생한 뒤 피해자가 밟을 수 있는 구제 절차를 다룹니다. (강의: 한국형사·법무정책연구원 윤해성 선임연구위원)',
    materials: [
      {
        label: '보이스피싱 피해자 구제 강의안 (PPTX · 317KB)',
        href: 'https://sugrcdndujsstsdxmepc.supabase.co/storage/v1/object/public/downloads/6d81b0ad-file.pptx',
      },
    ] as LessonMaterial[],
  },
]

/**
 * 과정 요약 수치는 강의 목록에서 직접 계산한다.
 * 이전에는 "총 4강 / 1시간 54분" 같은 값을 여러 파일에 손으로 적어둬서,
 * 차시를 추가할 때마다 화면마다 다른 숫자가 남았다
 * (커리큘럼 페이지는 4강이 렌더링되는데 배지는 "총 3강"이었다).
 */
export const voicePhishingTotalMinutes = voicePhishingLessons.reduce(
  (sum, lesson) => sum + parseInt(lesson.duration, 10),
  0,
)

/** 143 → '2시간 23분' */
export function formatLessonMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest}분`
  if (rest === 0) return `${hours}시간`
  return `${hours}시간 ${rest}분`
}

export const onlineCourses = [
  {
    id: 'voice-phishing-instructor',
    slug: 'voice-phishing-instructor',
    title: '보이스피싱 예방지도사 온라인 보충과정',
    eyebrow: '민간자격 연계 · 오프라인 보충',
    category: '자격증 과정',
    delivery: '온라인 + 오프라인 보충',
    audience: '오프라인 수강생, 기관 교육 담당자, 시민 안전 강사 후보',
    totalMinutes: voicePhishingTotalMinutes,
    lessonsCount: voicePhishingLessons.length,
    status: 'open' as CourseStatus,
    progress: 0,
    level: '입문~실무',
    summary:
      '보이스피싱 주요 피해 사례와 기본 개념부터 심화과정, 피해자 구제 절차까지 강의 영상으로 학습하는 온라인 보충과정입니다.',
    outcomes: ['사례 기반 위험 신호 분류', '피해 예방 안내 스크립트 작성', '기관 교육용 체크리스트 활용'],
    stats: [
      { label: '총 차시', value: `${voicePhishingLessons.length}강`, icon: BookOpen },
      { label: '학습 시간', value: formatLessonMinutes(voicePhishingTotalMinutes), icon: Clock },
      { label: '자료', value: '준비 중', icon: FileText },
      { label: '평가', value: '준비 중', icon: ClipboardCheck },
    ],
  },
  {
    id: 'life-safety-instructor',
    slug: 'life-safety-instructor',
    title: '생활안전지도사 온라인 보충과정',
    eyebrow: '민간자격 연계 · 준비 중',
    category: '자격증 과정',
    delivery: '온라인 보충',
    audience: '생활안전 교육 수강생 및 지역 활동가',
    totalMinutes: 360,
    lessonsCount: 5,
    status: 'preparing' as CourseStatus,
    progress: 0,
    level: '입문',
    summary: '생활 안전 위험요소를 관찰하고 시민에게 설명하는 기본 흐름을 온라인 자료로 복습합니다.',
    outcomes: ['생활안전 점검표 이해', '지역 위험요소 설명', '교육 후 활동 계획 작성'],
    stats: [
      { label: '총 차시', value: '5강', icon: BookOpen },
      { label: '학습 시간', value: '6시간', icon: Clock },
      { label: '자료', value: '3종', icon: FileText },
      { label: '상태', value: '준비 중', icon: ShieldCheck },
    ],
  },
  {
    id: 'citizen-safety-basics',
    slug: 'citizen-safety-basics',
    title: '시민 안전 기초 특강',
    eyebrow: '공개 특강 · 시민용',
    category: '기관교육',
    delivery: '온라인',
    audience: '일반 시민, 주민자치회, 공공기관 교육 담당자',
    totalMinutes: 120,
    lessonsCount: 3,
    status: 'invite_only' as CourseStatus,
    progress: 0,
    level: '기초',
    summary: '도시안전·생활안전·범죄예방을 시민 눈높이에서 이해하는 짧은 온라인 특강입니다.',
    outcomes: ['생활 속 위험 신호 이해', '기관 교육 전 사전학습', '질문지 작성'],
    stats: [
      { label: '총 차시', value: '3강', icon: BookOpen },
      { label: '학습 시간', value: '2시간', icon: Clock },
      { label: '대상', value: '시민/기관', icon: Users },
      { label: '방식', value: '초대형', icon: UserCheck },
    ],
  },
]

export const mockEnrollments = [
  { name: '수강생 A', cohort: '2026년 7월 보이스피싱 1기', course: '보이스피싱 예방지도사', progress: 35, invite: '수강 중', lastSeen: '오늘 10:20' },
  { name: '수강생 B', cohort: '2026년 7월 보이스피싱 1기', course: '보이스피싱 예방지도사', progress: 0, invite: '초대 완료', lastSeen: '미접속' },
  { name: '수강생 C', cohort: '2026년 7월 생활안전 1기', course: '생활안전지도사', progress: 82, invite: '수료 임박', lastSeen: '어제 18:02' },
  { name: '수강생 D', cohort: '기관 단체교육 A반', course: '시민 안전 기초 특강', progress: 100, invite: '완료', lastSeen: '2일 전' },
]

export const safetyGates = [
  '관리자 화면은 실제 수강생 개인정보 없이 가명 mock 데이터만 사용',
  '강의 영상·자료의 무단 복제·공유·재배포 금지',
  '결제·환불·초대메일 발송 기능 비활성',
  'Supabase 운영 DB schema 변경 없음',
  '민간자격 고지 유지 및 국가자격 오인 금지',
]
