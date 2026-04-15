# CHANGELOG

리디자인 세션 변경 이력. 디자인 결정·코드 수정·문서 변경을 날짜별로 기록.

---

## [2026-04-16] Header 로고 박스 제거 — 자연 비율 복원

### 배경
`docs/BRAND_ASSET_AUDIT.md` 증거 1~3에서 제기한 문제:
- 원본 로고 SVG는 세로형 (106 × 150, 비율 0.707)
- Header.tsx에서 44 × 44 정사각 박스에 강제 삽입
- 결과: 리본·방패 디테일 뭉개짐, 엠블럼이 "시스템 아이콘"처럼 보임

### 변경된 파일
- **`components/Header.tsx:125-143`**
  - 제거: `<div className="w-11 h-11 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white ...">` 래퍼
  - 변경: `<Image>` 에 `className="h-11 w-auto"` 직접 적용
  - 변경: width/height props를 32/45 로 조정 (원본 비율 유지)
  - 유지: hover 효과는 `group-hover:opacity-85` 로 단순화
  - 유지: 옆 텍스트 "대전경실련 / 도시안전디자인센터" 그대로

### 검증 (Playwright 실측)

**변경 전**:
```
displayW: 47.5, displayH: 47.5 (강제 정사각)
aspectRatio: 1.00 (원본 0.707 대비 41% 왜곡)
parentClass: w-11 h-11 rounded-xl border shadow bg-white
```

**변경 후**:
```
displayW: 35, displayH: 49.5 (자연 비율)
aspectRatio: 0.71 (원본 106/150 = 0.707과 일치)
parentTag: <a> (래퍼 없음)
```

**시각 확인**
- 데스크톱 1440×900: 네이비 헤더 배경에 엠블럼이 박스 없이 자연스럽게 배치, 옆 텍스트와 조화
- 모바일 375×812: 햄버거 메뉴 옆에서도 정상 표시, 비율 유지

### 남은 한계 (후속 작업 필요)
- Header 높이 제약(h-16 = 64px)으로 엠블럼 내부 디테일(시민 실루엣, 2011, 리본 영문)은 여전히 작게 표시됨
- 근본 해결: Illustrator에서 **가로형 wordmark SVG** 제작 (`BRAND_ASSET_AUDIT.md` 섹션 2-A)
- 이번 변경은 "원본을 왜곡 없이 표시"하는 임시 대응이며, 원본 비율을 건드리지 않음

---

## [2026-04-15] 브랜드 팔레트 단일화 — Safety Green 채택

### 배경
UX 진단(`UX_DIAGNOSIS_REPORT.md` H1) 결과 사이트에 **3가지 브랜드 팔레트가 공존**하고 있었음:
1. `BRAND_DESIGN_GUIDELINES.md` — Teal `#00B5AD`
2. `app/globals.css` — Navy + Green `#2e7d32` + Amber
3. 실제 렌더링 — Navy + Orange `#e85d04`

이 불일치가 CTA 통일·리디자인 작업 진행을 가로막음.

### 결정
**Navy `#1a3a5c` (Primary) + Safety Green `#2e7d32` (Accent) + Amber `#ff6f00` (Warning, 제한 사용)** 확정.
- 결정 근거: `docs/BRAND_PALETTE_DECISION.md` 섹션 3 (7개 기준 비교, Green 4승 2무 1패)
- 실측 사용 횟수: Navy 244회 / Orange 46회 / Green 38회 / Teal 0회
- 구현 비용: Green 채택 시 46곳만 수정, Teal 채택 시 84곳

### 변경된 파일 (16개)

#### 디자인 토큰 & 전역 스타일
- **`app/globals.css`**
  - `@theme` 블록에 Primary/Accent/Warning/Neutral 섹션 주석 추가
  - `.btn-primary` amber `#e65100` → green `#2e7d32` (hover `#1b5e20`)
  - 스크롤바 hover 색상 `#1e4080` → `#1a3a5c` (최신 네이비 토큰)

#### 컴포넌트
- **`components/Header.tsx`**
  - "자격증 신청" 상단 CTA: `bg-amber-700 hover:bg-amber-600` → `bg-green-700 hover:bg-green-800`

#### 페이지 (14개)
- **`app/page.tsx`**
  - 히어로 CTA "자격과정 알아보기": `bg-[#e65100] hover:bg-[#ff6f00]` → `bg-[#2e7d32] hover:bg-[#1b5e20]`
  - "시민 주도의 실천" 아이콘: `text-[#e65100]` → `text-[#2e7d32]`
  - 전화번호 강조 `text-[#e65100]` → `text-[#2e7d32]`
  - "안전 전문가" 포인트 강조 `#5cc46b` → `#43a047` (밝은 green-500로 통일)

- **`app/about/page.tsx`**
  - 운영 2대축 섹션: 범죄예방 `bg-[#0f2d5e]` → `bg-[#1a3a5c]` (토큰 일치)
  - 생활안전 `bg-[#e85d04]` → `bg-[#2e7d32]`

- **`app/about/fields/page.tsx`**
  - 생활안전 섹션 블록: `bg-[#e85d04]` → `bg-[#2e7d32]`, `text-orange-100` → `text-green-100`

- **`app/about/vision/page.tsx`**
  - MISSION 블록: `bg-[#0f2d5e]` → `bg-[#1a3a5c]`, `text-blue-300` → `text-navy-100`
  - VISION 블록: `bg-[#e85d04]` → `bg-[#2e7d32]`, `text-orange-200` → `text-green-100`

- **`app/about/network/page.tsx`**
  - 시민사회단체 카테고리: `bg-orange-50 text-orange-700` → `bg-green-50 text-green-700`

- **`app/certificates/page.tsx`**
  - 보이스피싱 예방지도사 카드 색상 스킴: orange 계열 → navy 계열 (iconColor/iconBg/accent/tagColor)
  - 의도: 두 자격증(보이스피싱/생활안전)을 **Navy vs Green 이원 구분**으로 전환해 /about 운영 2대축과 일치

- **`app/certificates/voice-phishing/page.tsx`**
  - 히어로 아이콘 박스: `bg-orange-500/20 text-orange-400` → `bg-white/10 text-green-300`
  - 태그 텍스트: `text-orange-300` → `text-green-200`
  - 활동분야 chevron 아이콘: `text-orange-500` → `text-green-600`
  - 자격 정보 박스(면책 성격): `bg-orange-50 border-orange-100` → `bg-amber-50 border-amber-200` (규칙 준수 — 면책 고지는 amber)
  - 면책 내부 박스: `bg-orange-100 text-orange-800` → `bg-amber-100 text-amber-800`

- **`app/education/page.tsx`**
  - 오프라인 교육 카드: `bg-orange-50 text-[#e85d04]` → `bg-navy-100 text-[#1a3a5c]` (Navy 톤 차등으로 온/오프라인 구분)
  - 교육 일정 리스트 "오프라인" 배지: `bg-orange-50 text-orange-700` → `bg-navy-100 text-navy-800`

- **`app/education/offline/page.tsx`**
  - "현장 교육" 라벨·아이콘: `text-[#e85d04]` → `text-[#1a3a5c]`
  - 교육 일정 문의 박스: `bg-orange-50` → `bg-navy-50`

- **`app/education/online/page.tsx`**
  - 보이스피싱 과정 태그: `bg-orange-50 text-orange-700` → `bg-navy-50 text-navy-700`

- **`app/notice/downloads/page.tsx`**
  - PPT 파일 아이콘: `text-orange-500 bg-orange-50` → `text-amber-600 bg-amber-50` (파일 포맷 관례 — amber 예외 허용)

- **`app/notice/schedule/page.tsx`**
  - 오프라인 배지: orange 계열 → navy 계열
  - "잔여 N석" (마감임박): `text-orange-600` → `text-amber-700` (경고 의미 유지)

- **`app/notice/results/page.tsx`**
  - 오프라인 type 배지: `bg-orange-50 text-orange-700` → `bg-navy-100 text-navy-800`

#### Amber 규칙 준수 유지 (변경 없음)
- `app/refund/page.tsx` — 환불 규정 경고 박스 (amber-50)
- `app/certificates/page.tsx:66-72` — 민간자격 면책 고지 배너 (amber-50)
- `app/certificates/disclosure/page.tsx:59-61` — 필수 법적 고지사항 (amber-50/-300/-900)

### 검증

실측 grep 결과:
```
orange-[0-9]|#e85d04|#e65100|#ff6f00|#ff8f00 → 0건
amber-[0-9]  → 12건 (모두 면책·환불·경고·마감임박·파일포맷 규칙 준수)
```

Playwright 시각 검증 (데스크톱 1440×900):
- `/` 홈 — 헤더 CTA·히어로 CTA·가치 카드 아이콘·전화 강조 모두 green 통일 ✓
- `/certificates` — 면책 amber 배너 유지, 2개 자격증 카드 navy/green 이원화, "자세히 보기" green CTA ✓
- `/contact` — "문의 보내기" 버튼 green CTA ✓

결과: 3개 핵심 페이지 모두 팔레트 단일화 완료, 면책 규칙 정상 작동.

### 문서 변경
- **신규**: `docs/BRAND_PALETTE_DECISION.md` — 결정 근거·팔레트 스펙·접근성·CTA 규칙 (9개 섹션)
- **갱신**: `BRAND_DESIGN_GUIDELINES.md` 섹션 2 — Teal 중심 → Navy+Green 중심으로 전면 재작성, 변경 이력 추가, CTA 버튼 시스템 규칙 추가
- **신규**: 이 파일 `docs/CHANGELOG.md`

### 영향 범위 요약
- **브랜드 일관성 회복**: 3중 팔레트 → 1개 팔레트로 통일
- **접근성 개선**: Green-700 on White = 5.4:1 (AA 통과), Green-800 on White = 8.2:1 (AAA 통과)
- **구현 부담**: 16개 파일, 약 50여 곳 수정
- **회귀 위험**: 낮음 — 토큰 치환이 대부분이라 레이아웃 변경 없음

### 다음 단계 (이번 결정으로 해제된 블로커)
- Stitch 프롬프트 실투입 가능 (`docs/STITCH_PROMPTS.md` 준비 완료)
- CTA 버튼 변경이 완료되어 리디자인 시안의 기준점 확립
- 남은 UX CRITICAL 이슈 (C1 지도·C2 공지더미·C3 일정더미·C4 센터장·C5 신청플로우) 작업 진입 가능

---

## [2026-04-15] UX 진단 & Stitch 프롬프트 준비

### 변경
- 신규 `docs/UX_DIAGNOSIS_REPORT.md` — 5개 사용자 여정·9개 페이지 진단 리포트
- 신규 `docs/STITCH_PROMPTS.md` — Stitch 리디자인 프롬프트 5종 (홈/자격증상세/오시는길/공지허브/교육허브)
- 신규 `docs/BRAND_ASSET_AUDIT.md` — 로고·BI 자산 감사 및 Illustrator 재작업 요청서

### 발견된 이슈 (미해결, 후속 작업 필요)
- **CRITICAL**
  - C1 지도 실제 연동 부재 (`/about/location`, `/contact`)
  - C2 공지 더미 데이터 2024년 (`/notice`)
  - C3 교육 일정 더미 데이터 2024년 (`/education`)
  - C4 센터장 사진·이름·직함 부재 (`/about/greeting`)
  - C5 실제 수강 신청 플로우 부재
- **HIGH**
  - H1 브랜드 팔레트 3중 공존 → **해결됨** (위 변경)
  - H2 `/education/online` 고유 콘텐츠 부재
  - H3 `/about/greeting` 여정 단절
  - H4 모바일 홈 히어로 줄바꿈 깨짐
  - H5 Sticky Sidebar 모바일 검증 미완료
- **로고 자산**
  - 원본 엠블럼(세로 1:1.41)이 44×44 정사각 박스에 압축
  - `public/brand/logo.jpg`, `logo-mark.jpg`, `logo-512.png`, `og-image.jpg` — Google Drive 원본에 없는 정체불명 파일
  - `logo-512.png` 확장자 오류 (실제 JPEG)
  - Apple Touch Icon·Favicon이 정사각형 아닌 세로형 사용
  - 영문명 불일치: `URBAN SAFETY DESIGN CENTER` (로고 리본) vs `Urban Safety Design Forum` (기존 문서)
