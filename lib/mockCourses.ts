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

export const onlineCourses = [
  {
    id: 'voice-phishing-instructor',
    slug: 'voice-phishing-instructor',
    title: '보이스피싱 예방지도사 온라인 보충과정',
    eyebrow: '민간자격 연계 · 오프라인 보충',
    category: '자격증 과정',
    delivery: '온라인 + 오프라인 보충',
    audience: '오프라인 수강생, 기관 교육 담당자, 시민 안전 강사 후보',
    totalMinutes: 65,
    lessonsCount: 3,
    status: 'open' as CourseStatus,
    progress: 0,
    level: '입문~실무',
    summary:
      '보이스피싱 주요 피해 사례와 기본 개념을 김창호 교수의 강의 영상으로 학습하는 온라인 보충과정입니다.',
    outcomes: ['사례 기반 위험 신호 분류', '피해 예방 안내 스크립트 작성', '기관 교육용 체크리스트 활용'],
    stats: [
      { label: '총 차시', value: '3강', icon: BookOpen },
      { label: '학습 시간', value: '1시간 5분', icon: Clock },
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

export const voicePhishingLessons = [
  {
    id: 'lesson-01',
    order: 1,
    title: '보이스피싱 주요 피해 사례 (1)',
    duration: '24분',
    status: 'current' as LessonStatus,
    summary: '실제 피해 사례를 통해 보이스피싱이 어떻게 시작되고 진행되는지 살펴봅니다. (강의: 김창호 교수)',
    materials: ['강의 요약 자료'],
  },
  {
    id: 'lesson-02',
    order: 2,
    title: '보이스피싱 주요 피해 사례 (2)',
    duration: '25분',
    status: 'locked' as LessonStatus,
    summary: '이어지는 피해 사례 분석으로 유형별 수법과 위험 신호를 구체적으로 파악합니다. (강의: 김창호 교수)',
    materials: ['위험 신호 체크리스트'],
  },
  {
    id: 'lesson-03',
    order: 3,
    title: '보이스피싱 기본과정',
    duration: '15분',
    status: 'locked' as LessonStatus,
    summary: '보이스피싱의 기본 개념과 예방 원칙을 정리하며 과정을 마무리합니다.',
    materials: ['예방 안내 자료'],
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
