# Google Stitch 프롬프트 세트 — urban-safety-website 리디자인

**작성일**: 2026-04-15
**기준 문서**: `UX_DIAGNOSIS_REPORT.md`, `BRAND_DESIGN_GUIDELINES.md`
**타겟 사용자**: 40-60대 시민, 대전 지역 주민, 교육담당 공무원, 시민단체 활동가

---

## 0. 공통 브랜드 컨텍스트 (모든 프롬프트에 붙여넣기)

```
Brand: 대전경실련 도시안전디자인센터 (Urban Safety Design Forum)
Nature: 35년 경실련 산하 시민공익단체. 범죄예방·생활안전 민간자격 교육기관
Mission: 시민 참여로 "누구도 소외되지 않는 안전한 도시"를 디자인
Audience: 40-60대 시민, 공공기관 교육 담당자, 시민단체 활동가
Tone: 신뢰·안심·전문성 (not 화려함, not 상업적, not 공포 마케팅)

Design System:
- Primary: Navy #1a3a5c (신뢰, 공공)
- Accent: Teal #00B5AD (전문성, 혁신) OR Green #2e7d32 (안전, 성장) — choose ONE
- Warning: Amber #ff6f00 (주의 고지만 사용)
- Background: #fafaf8 (warm neutral, not pure white)
- Typography: Pretendard / Noto Sans KR
- Base font size: 18px (중장년 가독성 필수)
- Line height: 1.7 (본문), word-break: keep-all (한글)
- Border radius: 12-16px (rounded but not playful)
- Shadow: soft layered shadows (not flat shadow-md)

Accessibility:
- WCAG AA 대비율 필수 (4.5:1 이상)
- 터치 타겟 최소 48px
- Focus-visible 상태 모든 인터랙티브 요소에
- 색상만으로 의미 전달 금지 (아이콘+텍스트 병기)

Mobile-first: 375px → 768px → 1440px
```

---

## 1️⃣ 홈페이지 (Hero + Value Props + Program Grid + CTA)

### 목적
첫 방문자에게 3초 안에 "누가·무엇을·왜 믿어야 하는지" 전달하고, 온라인 수강신청으로 유도.

### 해결해야 할 UX 이슈
- H4 모바일 히어로 줄바꿈 깨짐
- M4 CTA가 전화에만 치중
- M5 가치 카드 임팩트 약함

### 프롬프트

```
Design a Korean government/civic NGO homepage for a citizen safety education
center. The page must feel trustworthy, calm, and authoritative — NOT flashy.

Layout sections (top to bottom):

1. STICKY HEADER — Logo left, 7-item horizontal nav, "수강신청" CTA button
   (filled Navy) on the right. Mobile: hamburger menu with bottom slide-up.

2. HERO — Left side (60%): a warm, confident Korean headline
   "가족을 믿고 맡길 수 있는 / 우리 동네 안전 전문가"
   (break before "우리"). Subhead: "35년 경실련 공신력으로 세운 시민 안전교육 기관".
   Two CTA buttons: primary "온라인 수강신청" (filled), secondary "센터 소개 보기"
   (outline). Right side (40%): a soft illustration of a diverse Korean
   community (mother, elderly, child) OR a photo of a safety education class
   — warm lighting, NOT stock-photo vibe. Add subtle radial gradient + grain.

3. VALUE PROPS — 3-column card grid with large brand-color icons (not gray):
   • 시민 주도의 실천 (civic-hand icon)
   • 검증된 전문가 양성 (badge icon)
   • 참여형 사회공헌 (handshake icon)
   Each card: icon (48px, brand-colored) + title (20px bold) + 2-line
   description. Soft shadow. Hover: lift 4px + shadow deepen.

4. FLAGSHIP PROGRAMS — 2-column hero cards (NOT solid color blocks,
   use subtle gradient + photo overlay):
   • LEFT: "생활 안전 아카데미" — green tint gradient over real training photo
   • RIGHT: "도시안전디자인 전문가 과정" — navy tint gradient over real photo
   Each card has: small kicker label, large title, 3 feature bullets with
   check icons, "자세히 보기" text link with arrow.

5. SOCIAL PROOF STRIP — horizontal scroll of partner logos
   (대전광역시, 경찰청, 경실련, 대학교 로고 등). Grayscale, hover colorizes.

6. LATEST NEWS + NOTICE (2-column split):
   • LEFT: big news card with image, date, title, 2-line excerpt
   • RIGHT: notice list (최대 4개), category badge + title + date
   Use real-feeling dates like 2026-04-10, NOT 2024 dates.

7. PRIMARY CTA SECTION (warm navy background):
   "지금 시작하세요" headline. TWO CTAs side-by-side:
   • "온라인 수강신청" (big filled button, primary action)
   • "042-254-8060 전화 상담" (outline button with phone icon)
   Sub-text: "평일 09:00–18:00 / 1-2 영업일 내 답변"

8. FOOTER — 4-column link grid + org info + 민간자격 면책 고지 banner.

Mobile (375px): hero stacks vertically, value props stack, programs become
single column, news+notice stacks, CTA becomes full-width buttons.

Color palette STRICTLY:
- Navy #1a3a5c (headers, primary buttons)
- Teal #00B5AD or Green #2e7d32 (accents, check icons, link hovers)
- Amber #ff6f00 (ONLY for 민간자격 warning banner)
- Background #fafaf8
Do NOT use Tailwind default indigo/blue/orange.
```

---

## 2️⃣ 자격증 상세 페이지 (with Sticky Enrollment Sidebar)

### 목적
자격증 의사결정 + 수강 신청 전환.

### 해결해야 할 UX 이슈
- H5 모바일 sticky sidebar 전환
- M2 텍스트 일색 → 시각화
- C5 실제 신청 플로우 부재

### 프롬프트

```
Design a detail page for a Korean civic certification program
("보이스피싱 예방지도사"). This is a trust-heavy decision page for
40-60 year old Korean citizens. Tone: calm, authoritative, clear.

Layout:

1. BREADCRUMB + HERO BAR — Small breadcrumb "민간자격증 > 보이스피싱 예방지도사".
   Below: 2 small tag chips (민간자격, 금융피해 전문분야). Large title
   "보이스피싱 예방지도사" (36-44px). One-line description under title.
   Two buttons: "교육 신청하기" (filled, primary) + "자격 문의" (outline).
   Background: subtle navy gradient with soft grain texture. NO solid navy block.

2. MAIN CONTENT (8-col) + STICKY SIDEBAR (4-col) on desktop.
   Sidebar sticks from top of main content until end.

MAIN CONTENT sections:

A. 자격 소개 — a brief 3-4 paragraph description, but break it up with
   an infographic: "보이스피싱 피해 현황" — 3 stat cards with big numbers
   (연간 피해액 7,744억원, 신고 건수, 60대 이상 피해자 비율).

B. 교육목표 — 5 checkmark items in a clean 2-column grid, each with
   an icon. Hover: subtle background tint.

C. 교육과정 — curriculum accordion. Top row: 4 info pills (교육기간 4주,
   수강방식 온라인 강의, 평가방식 과제+시험, 교육대상 누구나).
   Below: 6 collapsible curriculum blocks (주차별).
   Each block expanded shows 3-5 bullet points + estimated hours.

D. 교육 방식 시각화 — 3-step illustration: "영상 수강 → 과제 제출 → 최종 평가"
   with small animations/transitions suggested.

E. 활동 분야 — 5 icon cards (주민센터, 경로당, 학교, 기업, 지역축제).

F. 자주 묻는 질문 — accordion FAQ, 4-6 items. Each answer 3-4 sentences
   with related links.

G. 후기/사례 — testimonial cards from past graduates (photo placeholder,
   name, role, 2-3 sentence quote).

STICKY SIDEBAR (right column):

- Header "수강료 및 발급비" with price table:
  수강료 220,000 / 심사료 30,000 / 자격증 발급비 50,000 → 총 300,000원
- Big primary button "지금 교육 신청하기" (takes up full width of sidebar)
- Divider
- 검정방법 & 합격기준 (4 key-value rows)
- 자격 정보: 자격증명, 등록번호, 자격관리기관, 연락처
- Amber highlighted box: "환불규정" link
- 문의하기: phone + online inquiry button

MOBILE (375px):
- Sidebar DOES NOT stay sticky. Instead:
- Price + "지금 신청하기" becomes a FIXED BOTTOM BAR (80px height, always
  visible above the fold, with shadow). This is CRITICAL.
- Curriculum accordion works natively.
- Stat cards stack horizontally scrollable.

Color palette: same as homepage. Navy primary, Teal/Green accent, Amber
only for warnings (환불규정 box). Rounded 12px corners. Soft layered shadows.
```

---

## 3️⃣ 오시는 길 (Location Page with Real Map + Action Bar)

### 목적
C1 지도 부재 + M1 교통편 정보 부족 동시 해결.

### 프롬프트

```
Design a "How to Visit Us" / "오시는 길" page for a Korean civic organization
located in Daejeon, South Korea. The page must make visiting EASY for
40-60 year old citizens who will use KakaoMap/Naver Map on their phone.

Layout:

1. HERO — Small, not overblown. Just a breadcrumb + "오시는 길" title +
   one-line subtitle. Subtle navy gradient. No illustration.

2. ADDRESS ACTION BAR — a prominent card (full width on mobile) containing:
   • Big pin icon on the left
   • Address text: "대전광역시 서구 용문동 255-4 서우아파트 상가동 201호"
   • FOUR action buttons in a row (mobile: 2x2 grid):
     - "주소 복사" (copy to clipboard)
     - "카카오맵으로 길찾기" (deep link)
     - "네이버지도로 길찾기" (deep link)
     - "T맵 내비" (deep link)
   Each button: icon + label, 48px tall, filled neutral background.

3. MAP EMBED — a REAL interactive map (Kakao Map embed), 400-500px tall.
   Marker with small info window. "크게 보기" link in corner.
   No placeholder text, no gray box.

4. TRANSIT CARDS — 3-column grid (mobile: 1-column stack):
   • "버스 이용" — bus icon, top: nearest stop name, distance (도보 5분, 280m),
     then 2-3 major routes (37, 102, 201번), link "카카오버스로 실시간 도착정보".
   • "지하철 이용" — subway icon, top: station + exit (중남대병원역 1번 출구),
     distance (도보 10분, 650m), a small map thumbnail showing walking path.
   • "자동차 / 주차" — car icon, top: "건물 내 방문자 주차 가능 (시간당 무료)",
     navigator button to launch navigation app.

5. NEARBY LANDMARKS — small section with 4-6 landmark chips:
   "중남대병원 · 용문역 · 서우아파트 · 대전시청 방면 등"
   Helps mental orientation.

6. VISIT TIPS — "방문 전 확인" callout box with 3-4 tips:
   - 운영시간 평일 09:00-18:00 (점심 12:00-13:00)
   - 방문 예약 권장 (전화 또는 온라인 폼)
   - 접근성: 엘리베이터 O, 휠체어 진입 가능
   - 가까운 공공 화장실 위치

7. BOOK A VISIT CTA — "방문 상담 예약하기" button linking to /contact,
   + direct phone number in a "바로 전화" button.

Style: calm, practical, functional. No decorative fluff.
Color: navy + neutral + teal/green accent.
```

---

## 4️⃣ 공지·자료실 허브 (Notice Hub with Filter + Rich List)

### 목적
C2 더미 공지 문제 + 정보 탐색성 개선.

### 프롬프트

```
Design a Korean civic organization's notice/resource hub page. The page
must feel ACTIVE and MAINTAINED, not abandoned. Content updated April 2026.

Layout:

1. HERO — Title "공지·자료실" + subtitle. One-line status indicator:
   "최근 업데이트 2026-04-15" (proves the site is alive).

2. CATEGORY TABS (horizontal) — 5 tabs with icons + count badges:
   • 공지사항 (12)
   • 교육 일정 (8)
   • 교육 실적 (24)
   • 자료 다운로드 (16)
   • 언론 보도 (9)
   Active tab has filled background, inactive is ghost style.

3. FILTER BAR — below tabs: year dropdown + search input (magnifier icon).

4. CONTENT LIST — rich list item, NOT plain table rows. Each row has:
   • Left: category chip (colored by type) + date
   • Middle: title (large, clickable) + 1-line excerpt if available
   • Right: attachment icon if PDF present, view count, "NEW" badge for <7일
   • Hover: entire row lifts with shadow, title underlines
   At least 8 items visible. Use REAL 2026 dates (2026-04-12, 2026-04-08, etc).

5. PINNED ANNOUNCEMENT (top) — 1-2 highlighted important notices with
   amber background tint, "중요" badge.

6. PAGINATION — simple, clear. "< 1 2 3 4 5 >" + items-per-page selector.

7. SIDEBAR (desktop only, 3-col) — "빠른 링크":
   • 교육 일정 바로가기
   • 수강 신청 양식
   • 자료 다운로드 모아보기
   • 언론보도 아카이브
   Plus a small "뉴스레터 구독" form: email input + button.

MOBILE: no sidebar. Tabs become horizontal scroll. List becomes vertical
cards with category chip on top-left corner.

Color: navy titles, teal/green links, amber for important badges.
Row dividers: 1px #e5e7eb. Generous row padding (16px vertical).
```

---

## 5️⃣ 교육 수강 허브 + 신청 플로우 (Education Hub with Real Enrollment)

### 목적
C5 실제 수강 신청 경로 부재 해결.

### 프롬프트

```
Design a Korean civic education organization's enrollment hub page. The
goal: take a visitor from "교육 방식 선택" to "수강 신청 완료" in 3 clear
steps. Calm, trustworthy, easy for older adults.

Layout:

1. HERO — "교육안내" title + subtitle "목적과 상황에 맞는 교육과정을
   선택하세요". Small stepper below showing the 3-step flow:
   "1. 교육 방식 → 2. 자격 선택 → 3. 신청 완료". Current step highlighted.

2. THREE EDUCATION MODES — 3 large cards (equal weight, equal height):
   • 온라인 교육 — laptop icon, Green tint, key features:
     "24시간 수강 가능 / 모바일 지원 / 자동 진도관리"
   • 오프라인 교육 — building icon, Navy tint, features:
     "강사 직접 지도 / 실습 포함 / 수료증 즉시"
   • 기관·단체 교육 — handshake icon, Teal tint, features:
     "찾아가는 교육 / 맞춤형 설계 / 단체 할인"
   Each card has a clear "선택하기" button that advances to step 2.

3. UPCOMING SCHEDULE — "예정 교육 일정" real-data table:
   8-12 rows with 2026 dates. Columns: 일자, 구분, 과정명, 정원, 상태.
   Status badges: 모집중 (green), 마감임박 (amber), 마감 (gray).
   Clickable rows → leads to quick apply modal.

4. QUICK APPLY FORM (revealed below, not modal, on desktop) —
   mobile-friendly form with:
   • 이름 *
   • 연락처 * (010-0000-0000 format)
   • 이메일 *
   • 선택한 교육과정 (pre-filled from card click, editable dropdown)
   • 선택한 수강 방식 (pre-filled)
   • 희망 기수/일정 (dropdown of real upcoming schedules)
   • 특이사항/질문 (optional textarea)
   • 개인정보처리방침 동의 checkbox + link
   • "수강 신청하기" big button (primary)
   Below button: trust signals — "1-2 영업일 내 확인 연락", "취소/환불 규정
   보기", phone fallback.

5. FAQ — 6 items relevant to enrollment decisions:
   • 비전공자도 가능한가요?
   • 온라인 수강 환경은 어떻게 되나요?
   • 수료율 / 합격률은 얼마나 되나요?
   • 자격증 활용도는 어떻게 되나요?
   • 환불 규정은 어떻게 되나요?
   • 단체 할인 있나요?
   Each answer 3-5 sentences, not one-liners.

6. INQUIRY FALLBACK — bottom section "결정이 어려우세요?"
   2 buttons: "전화 상담 042-254-8060" + "카카오톡 상담" + "온라인 문의"

MOBILE: 3 mode cards stack. Schedule table becomes swipeable cards.
Form is full-width. FAQ is accordion.

Color: navy primary, green for "online" mode, teal for "group" mode.
Status badges use green/amber/gray semantic colors.
```

---

## 6. 사용 가이드 — Stitch에서 생성 → Claude Code 이식

### 단계 1: Stitch에서 생성
1. [stitch.withgoogle.com](https://stitch.withgoogle.com) 접속
2. 새 프로젝트: "Urban Safety — April 2026 Redesign"
3. 위 프롬프트 중 하나를 복사 → 공통 브랜드 컨텍스트(섹션 0) 먼저 붙여넣기 → 본문 붙여넣기
4. 각 프롬프트당 3-4개 변형 생성
5. 마음에 드는 스크린을 프로젝트에 저장 (단일 스크린 아닌 **프로젝트 단위**로 묶어야 MCP가 잘 가져옴)

### 단계 2: Claude Code로 가져오기
```
# Claude Code 세션에서
/mcp
# stitch 도구 확인

# 예시 호출
"Stitch 프로젝트 'Urban Safety — April 2026 Redesign'의 홈 스크린
HTML/CSS를 가져와서 기존 app/page.tsx와 components/Header.tsx
구조에 맞게 Next.js + Tailwind로 이식해줘.
globals.css의 기존 토큰(@theme color 변수)을 그대로 사용하고,
새 토큰은 필요할 때만 추가해."
```

### 단계 3: 검증
- `npm run dev` → `localhost:3001`
- Playwright MCP로 리디자인 전후 스크린샷 비교
- 모바일 375px / 태블릿 768px / 데스크톱 1440px 모두 확인
- CLAUDE.md의 "2회 이상 비교 라운드" 규칙 준수
- `UX_DIAGNOSIS_REPORT.md`의 CRITICAL 5건이 모두 해결되는지 체크

### 단계 4: 이식 순서 권장
1. **홈** (가장 가시성 높음, 빠른 개선 체감)
2. **자격증 상세** (수강 전환 핵심)
3. **교육 수강 허브** (전환 플로우 완성)
4. **오시는 길** (기능 결함 해결)
5. **공지 허브** (콘텐츠 관리 기반 확립)

---

## 7. 주의사항

- Stitch가 생성한 HTML은 **레이아웃·토큰 참고용**. 그대로 복사 금지
- 기존 `components/` 구조·명명 규칙 유지
- `lib/content-store.ts` 데이터 소스 계속 사용
- CTA 버튼 색상은 **팔레트 최종 결정 후** 일괄 치환 (H1 선결 과제)
- 이미지는 `https://placehold.co/` 플레이스홀더 → 추후 실제 자산으로 교체
