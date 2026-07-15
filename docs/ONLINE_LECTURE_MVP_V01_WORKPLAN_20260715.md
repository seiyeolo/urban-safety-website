# Urban Safety Online Lecture MVP v0.1 작업계획

**작성일**: 2026-07-15  
**대상 프로젝트**: `/Users/mac/Library/Mobile Documents/com~apple~CloudDocs/20260410_Urban/urban-safety-website`  
**배포 사이트**: `https://urban-safety-website.vercel.app/`  
**상태**: 내부 검토용 / mock 기반 / 구현 전 작업계획  
**근거 문서**: `docs/ONLINE_LECTURE_RESTRUCTURE_BENCHMARK_PLAN_20260715.md`

---

## 1. 결론: mock 기반 MVP부터 진행해야 하는 이유

현재 Urban Safety 웹사이트에는 이미 `온라인 교육`, `자격증 상세`, `로그인`, `대시보드`, `관리자`의 기초가 있다.  
하지만 실제 온라인 강의실로 전환하려면 개인정보, 수강권한, 영상 접근권한, 진도관리, 결제/환불, 수료 기준이 연결된다.

따라서 첫 단계는 실제 데이터·영상·결제·운영 DB 없이 **mock 화면으로 수강생 경험을 먼저 검증**하는 것이 맞다.

> 목표는 “동영상을 올리는 것”이 아니라, 오프라인 수강생이 온라인에서 강의를 듣는 전체 흐름을 눈으로 확인하는 것이다.

---

## 2. 현재 사이트에서 재사용할 자산

| 현재 자산 | 위치 | 재사용 방향 |
|---|---|---|
| 온라인 교육 페이지 | `app/education/online/page.tsx` | `/courses` 카탈로그의 기초 데이터로 확장 |
| 자격증 상세 페이지 | `app/certificates/voice-phishing/page.tsx`, `app/certificates/life-safety/page.tsx` | 강의 상세 페이지의 커리큘럼/비용/FAQ 구조 재사용 |
| 로그인/회원가입 | `app/auth/login/page.tsx`, `app/auth/signup/page.tsx` | 내 강의실 진입 UX 기반 |
| 대시보드 | `app/dashboard/page.tsx` | `/dashboard/learning` 학습 대시보드로 확장 |
| 관리자 페이지 | `app/admin/*` | 수강생 배정/강의 관리 mock 구조의 기반 |
| Supabase 클라이언트 | `lib/supabase/client.ts`, `lib/auth/AuthContext.tsx` | Phase 2 이후 수강권한/진도관리 후보. Phase 1에서는 운영 DB 변경 금지 |
| 기존 E2E 보고서 | `E2E_TEST_REPORT.md` | 모바일 메뉴, 헤딩 구조, 색상 대비 개선 항목 반영 |

---

## 3. 신규 화면 5개 설계

### 3-1. `/courses` — 전체 온라인 강의 카탈로그

목적: 수강생이 들을 수 있는 강의를 한눈에 본다.

핵심 UI:
- 상단 Hero: “온라인으로 이어지는 도시안전 교육”
- 필터: 자격증 과정 / 시민안전 특강 / 오프라인 보충 / 기관교육
- 강의 카드:
  - 과정명
  - 대상자
  - 총 차시/총 시간
  - 수강 방식: 온라인 / 혼합 / 보충
  - 상태: 수강 가능 / 준비 중 / 초대 전용
  - CTA: 자세히 보기 / 내 강의실에서 보기

mock 카드:
1. 보이스피싱 예방지도사 온라인 보충과정
2. 생활안전지도사 온라인 보충과정
3. 시민 안전 기초 특강
4. 기관 단체교육 사전학습

### 3-2. `/courses/voice-phishing-instructor` — 강의 상세

목적: 수강 전 과정의 가치, 커리큘럼, 수료 기준을 이해한다.

핵심 섹션:
- 과정 요약: 총 6모듈 / 20시간 / 모바일 수강 가능 / 수료 기준 안내
- 이런 분께 필요합니다
- 커리큘럼 목록
- 수강 후 할 수 있는 일
- 수료/평가 기준
- 민간자격 고지
- FAQ
- CTA: 로그인 후 수강하기 / 교육 문의

### 3-3. `/dashboard/learning` — 내 강의실

목적: 로그인한 수강생이 자신의 배정 강의와 이어보기를 확인한다.

핵심 UI:
- “이어보기” 카드
- 수강 중인 과정 목록
- 진도율 bar
- 남은 차시
- 강의자료 다운로드 링크
- 공지/시험 안내
- 상태: 수강 중 / 완료 / 기간 만료

mock 상태:
- 보이스피싱 예방지도사 온라인 보충과정: 35% 진행, 2강 이어보기
- 생활안전지도사: 미시작

### 3-4. `/learn/voice-phishing-instructor/lesson/01` — 강의 플레이어 mock

목적: 실제 동영상 수강 화면을 검증한다.

핵심 UI:
- 좌측/상단 영상 플레이어 placeholder
- 우측/하단 차시 목록
- 현재 차시 제목/요약
- 강의자료 다운로드
- 체크리스트/퀴즈 진입
- 이전/다음 강의
- 진도 저장 안내

Phase 1에서는 실제 영상 URL이 아니라 placeholder를 사용한다.

### 3-5. `/admin/enrollments` — 수강생 배정 mock

목적: 오프라인 수강생을 온라인 강의에 배정하는 운영 흐름을 설계한다.

핵심 UI:
- 기수/반 선택
- 수강생 목록 mock
- 배정 강의 선택
- 초대 상태: 초대 전 / 초대 완료 / 로그인 완료 / 수강 중
- 개인정보 주의 배너

Phase 1에서는 실제 개인정보를 쓰지 않고 `홍길동`, `수강생 A` 같은 가명 mock만 사용한다.

---

## 4. mock 데이터 구조

### Course

```ts
type Course = {
  id: string
  slug: string
  title: string
  category: 'certificate' | 'citizen-safety' | 'offline-supplement' | 'group-training'
  delivery: 'online' | 'hybrid' | 'offline_supplement'
  audience: string
  totalMinutes: number
  lessonsCount: number
  status: 'open' | 'invite_only' | 'preparing'
  certificateLinked: boolean
  summary: string
}
```

### Lesson

```ts
type Lesson = {
  id: string
  courseSlug: string
  order: number
  title: string
  durationMinutes: number
  videoPlaceholder: string
  summary: string
  materials: { title: string; type: 'pdf' | 'checklist' | 'worksheet'; href: string }[]
  hasQuiz: boolean
}
```

### Mock Enrollment

```ts
type MockEnrollment = {
  id: string
  learnerName: string
  courseSlug: string
  cohortName: string
  progressPercent: number
  lastLessonId?: string
  inviteStatus: 'not_sent' | 'sent' | 'joined' | 'learning' | 'completed'
}
```

---

## 5. 화면별 수강생 사용자 흐름

### 신규 온라인 수강생

```text
/courses
→ 관심 과정 선택
→ /courses/voice-phishing-instructor
→ 로그인/회원가입
→ /dashboard/learning
→ /learn/voice-phishing-instructor/lesson/01
→ 강의자료 다운로드
→ 다음 강의 이동
```

### 오프라인 수강생 보충 수강

```text
오프라인 수업 안내 받음
→ 관리자 초대/계정 생성
→ 로그인
→ /dashboard/learning에서 배정 강의 확인
→ 이어보기
→ 진도율 확인
→ 수료/검정 안내 확인
```

### 관리자 운영자

```text
/admin/enrollments
→ 기수 선택
→ 수강생 mock 목록 확인
→ 강의 배정 상태 확인
→ 초대 상태/진도율 확인
→ 막힌 수강생 연락 후보 확인
```

---

## 6. 오프라인 수강생 → 온라인 수강생 전환 흐름

1. 오프라인 교육 신청/참석자 명단 확정
2. 개인정보 처리 동의 및 온라인 수강 안내 확인
3. 관리자 화면에서 기수/반 생성
4. 수강생 계정 초대 또는 임시 계정 발급
5. 수강생 로그인
6. 내 강의실에서 배정 과정 확인
7. 동영상 수강 및 자료 다운로드
8. 진도율 80% 이상 등 수료 조건 확인
9. 퀴즈/평가/수료 또는 자격 검정 안내

Phase 1에서는 위 흐름을 화면으로만 보여주며 실제 개인정보/초대/메일 발송은 하지 않는다.

---

## 7. 소라 안전 게이트

| 게이트 | Phase 1 처리 |
|---|---|
| 개인정보 | 실제 수강생 정보 금지. 가명 mock만 사용 |
| 영상 저작권 | 실제 영상 업로드 금지. placeholder만 사용 |
| 결제 | checkout/결제 활성화 금지 |
| 운영 DB | Supabase schema 변경/마이그레이션 금지 |
| 배포 | production 배포 금지. 로컬 또는 preview 전용 |
| 자격증 고지 | 민간자격 고지 유지. 국가자격 오인 금지 |
| 수료/합격률 | 검증 없는 수치 금지. 기준은 “예시”로 표시 |
| 외부 발송 | 초대메일/SMS 발송 금지 |

---

## 8. 구현 전 세열님 결정 필요 4가지

1. **영상 호스팅 방식**  
   후보: YouTube 일부공개, Vimeo, Cloudflare Stream, Supabase Storage, 자체 서버.

2. **수강생 계정 발급 방식**  
   후보: 직접 회원가입, 관리자 초대 링크, 임시 비밀번호, 오프라인 명단 일괄 등록.

3. **MVP 구현 범위**  
   선택지 A: mock 화면만  
   선택지 B: mock 화면 + local state 진도율  
   선택지 C: Supabase 테스트 테이블까지  
   추천: A → B → C 순서.

4. **결제 포함 여부**  
   오프라인 수강생 보충용이면 결제는 제외.  
   온라인 판매까지 하려면 약관/환불/결제/개인정보 고지 정비 후 별도 승인.

---

## 9. 준호에게 넘길 Claude Code/Codex 작업 프롬프트 초안

```text
현재 폴더는 Urban Safety 웹사이트 Next.js 프로젝트다.
목표는 실제 개인정보/영상/결제/DB/배포 없이 mock 기반 온라인 강의실 MVP 화면을 만드는 것이다.

작업 범위:
1. /courses 신규 페이지
2. /courses/voice-phishing-instructor 신규 페이지
3. /dashboard/learning 신규 페이지
4. /learn/voice-phishing-instructor/lesson/01 신규 페이지
5. /admin/enrollments mock 신규 페이지 또는 기존 admin 구조 안에 추가
6. mock 데이터 파일 생성: lib/mockCourses.ts 또는 data/mock-courses.ts

금지:
- 실제 수강생 개인정보 사용 금지
- 실제 동영상 URL 연결 금지
- 결제 활성화 금지
- Supabase 운영 DB schema 변경 금지
- production 배포 금지
- git push 금지
- 외부 발송 금지

완료 기준:
- npm run build 통과
- 주요 페이지 로컬 렌더링 확인
- 각 페이지에 mock 데이터만 사용
- 모바일에서 카드/플레이어/차시목록이 깨지지 않음
- 민간자격/개인정보/영상 placeholder 고지 포함
- 변경 파일 목록과 검증 결과 보고

먼저 구현 계획과 파일 변경 목록을 제안하고, 승인 범위 안에서만 진행한다.
```

---

## 10. 대표 보고 5줄 요약

```text
[Hermes Telegram 요약 전달 요청]
결론: Urban Safety 온라인 강의실은 실제 영상/개인정보/결제 없이 mock 기반 MVP 화면부터 만드는 것이 안전하고 빠릅니다.
완료/진행중/막힘: 작업계획 문서 작성 완료. 다음 단계는 준호가 mock 화면 5개를 구현하는 것입니다.
산출물 위치: docs/ONLINE_LECTURE_MVP_V01_WORKPLAN_20260715.md
소라 검수 상태: 개인정보, 실제 영상, 결제, 운영 DB, production 배포, 외부 발송은 모두 금지로 명시했습니다.
세열님 결정 필요: mock 화면 구현을 바로 진행할지, 영상 호스팅/계정 방식 결정 후 진행할지 선택 필요합니다.
```

---

## 11. 추천 다음 행동

세열님이 빠른 진행을 원하므로 추천은 명확하다.

> **mock 화면 5개 구현을 바로 진행한다.**

단, 실제 영상·개인정보·결제·Supabase 운영 DB·배포는 붙이지 않는다.  
이 방식이면 퍼티스트 랜딩페이지처럼 빠르게 눈으로 확인 가능한 결과물을 만들 수 있다.
