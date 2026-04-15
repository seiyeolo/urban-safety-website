# 디자인 벤치마킹 리포트 — urban-safety-website

> **작성일**: 2026.04.15  
> **대상**: 대전경실련 도시안전디자인센터 웹사이트  
> **목표**: 시민공익단체/교육기관형 신뢰 웹사이트로 재정렬

---

## 1. 레퍼런스 목록

### A. 해외 비영리/공익기관 (Awwwards)

| 순번 | 사이트명 | 출처 | 한 줄 요약 |
|------|----------|------|------------|
| 1 | **British Red Cross - One Kind Thing** | Awwwards Nominee | 따뜻한 컬러와 스토리텔링이 결합된 공익캠페인 사이트 |
| 2 | **The Integrate Agency CIC** | Awwwards Winner | 소셜엔터프라이즈의 깔끔하고 전문적인 비즈니스 톤 |
| 3 | **RadiatingHope®** | Awwwards Honorable Mention (2025) | 희망을 전달하는 미니멀하고 따뜻한 비영리 사이트 |

### B. 기업/전문서비스 (Awwwards)

| 순번 | 사이트명 | 출처 | 한 줄 요약 |
|------|----------|------|------------|
| 4 | **Professional Services Collection** | Awwwards Business Services | 신뢰감 있는 법무법인/마케팅에이전시 디자인 패턴 |
| 5 | **Corporate Business Collection** | Awwwards Business Category | 기업형 웹사이트의 클린하고 전문적인 레이아웃 구조 |
| 6 | **Microsoft AI** | Awwwards Business & Services (2025) | 기술기업의 신뢰감과 전문성을 보여주는 미니멀 디자인 |

### C. 한국 시민단체/공익기관

| 순번 | 사이트명 | 출처 | 한 줄 요약 |
|------|----------|------|------------|
| 7 | **아름다운재단 (beautifulfund.org)** | 실제 기관 사이트 | 기부문화를 위한 따뜻하고 신뢰감 있는 한국형 공익사이트 |
| 8 | **참여연대 (peoplepower21.org)** | 실제 기관 사이트 | 시민운동단체의 정보 중심 구조와 신뢰감 구축 방식 |
| 9 | **한국 YWCA연합회** | 실제 기관 사이트 | 교육/시민단체의 청년-중장년 아우르는 디자인 접근 |

### D. UI 컴포넌트 (Dribbble)

| 순번 | 사이트명 | 출처 | 한 줄 요약 |
|------|----------|------|------------|
| 10 | **NGO Website Hero Section UI** | Dribbble (Bibhu Prasanna Mohanty) | 비영리기관 히어로 섹션의 신뢰감과 임팩트 균형 |
| 11 | **Nonprofit Hero Components** | Dribbble Collections | 기부/참여 유도를 위한 감성적 히어로 디자인 패턴 |
| 12 | **Charity Website UI Collections** | Dribbble Tags | 자선/공익단체 웹사이트의 카드/CTA 디자인 베스트 프랙티스 |

---

## 2. 패턴 추출표

| 영역 | 참고 사례 | 관찰 포인트 | 우리 사이트 적용안 |
|------|-----------|-------------|---------------------|
| **헤더/네비** | British Red Cross, 아름다운재단 | 상단 컬러 포인트 바 + 로고 좌측 + 심플 메뉴 | 현재 흰 헤더 → 상단 그린 얇은 바 + 네이비 로고 |
| **히어로 섹션** | Microsoft AI, Professional Services | 밝은 배경 + 진한 텍스트 + 그라디언트 최소화 | 현재 네이비 그라디언트 → 크림/화이트 + 네이비 텍스트 |
| **신뢰도 지표** | NGO Hero Section, RadiatingHope | 수치 + 아이콘 + 간결한 설명의 4-grid 구조 | 현재와 유사하지만 아이콘 크기 확대 + 컬러 포인트 |
| **카드 섹션** | Integrate Agency, Charity Collections | 흰 카드 + 상단 컬러 액센트 + 그림자 최소화 | 현재 네이비/오렌지 카드 → 흰 카드 + 그린 액센트 라인 |
| **공지/리스트** | 참여연대, Corporate Business | 깔끔한 테이블형 + 날짜 강조 + 호버 효과 | 현재 구조 유지하되 타이포그래피 개선 |
| **CTA 버튼** | 2026 Design Trends, Dribbble | 둥근 모서리 + 충분한 패딩 + 호버 그림자 | 현재 각진 버튼 → radius-xl + 앰버 컬러 |
| **자격증 섹션** | Nonprofit Collections | 배지/스탬프 느낌 + 인증서 무드 강화 | 현재 테두리 카드 → 배경 컬러 + 인증 아이콘 강조 |
| **푸터** | YWCA, Professional Services | 3-컬럼 정보 구조 + 컨택트 강조 + SNS | 현재 구조 개선 + 연락처 시각적 강조 |
| **모바일** | 2026 Minimalist Trends | 여백 확대 + 폰트 크기 18px+ + 터치 영역 44px+ | 전체적으로 모바일 여백/폰트 확대 필요 |

---

## 3. 홈 화면 개편 방향

### 3.1 전체 톤앤매너 (3문장)

1. **"가족을 믿고 맡길 수 있는 동네 안전 전문가"** — 딱딱한 관공서도 화려한 상업 플랫폼도 아닌 따뜻하고 신뢰감 있는 시민단체
2. **네이비(신뢰) + 그린(안전) + 앰버(행동촉구)** 컬러 시스템으로 35년 경실련의 무게감과 시민사회의 따뜻함을 동시에 표현
3. **넉넉한 여백과 중장년 친화적 타이포그래피**로 40~60대 주 타겟층의 가독성을 최우선 고려

### 3.2 버려야 할 현재 디자인 요소

- ❌ **히어로 섹션 짙은 네이비 그라디언트** (IT스타트업 느낌)
- ❌ **공격적 오렌지 컬러** (#e85d04) → 안전한 그린으로 교체
- ❌ **네이비/오렌지 꽉 찬 배경 카드** → 흰 카드 + 컬러 포인트로
- ❌ **딱딱한 흰색 헤더** → 상단 컬러 바 + 따뜻함 추가
- ❌ **테두리만 있는 밋밋한 자격증 카드** → 배지/인증서 무드로

### 3.3 유지해도 되는 요소

- ✅ **4-grid 신뢰도 지표 구조** (수치 + 설명 조합이 효과적)
- ✅ **핵심분야 2-카드 레이아웃** (범죄예방 + 생활안전 구분 명확)
- ✅ **자격증 상세 정보 구조** (커리큘럼 + 취업분야 + 기간/비용)
- ✅ **전체적인 정보 위계** (소개 → 신뢰도 → 분야 → 자격증 → 공지)
- ✅ **lucide-react 아이콘 시스템** (일관성 있고 깔끔함)

---

## 4. 공통 UI 개편 방향

### 4.1 컬러 시스템 개선

| 역할 | 현재 | 개선안 | 적용 영역 |
|------|------|--------|----------|
| Primary | `#06153a` (너무 어둠) | `#1a3a5c` (차분한 신뢰) | 헤더, 주요 텍스트 |
| Accent | `#e85d04` (공격적) | `#2e7d32` (안전 그린) | 카드 액센트, 아이콘 |
| CTA | 없음 | `#e65100` (따뜻한 앰버) | 버튼, 강조 요소 |
| Background | 흰색/회색 | `#fafaf8` (따뜻한 크림) | 전체 배경, 카드 |
| Text | `gray-700` | `#2c3e50` (부드러운 다크) | 본문, 설명 텍스트 |

### 4.2 타이포그래피 시스템

```css
/* 본문 (40~60대 친화) */
body { font-size: 18px; line-height: 1.7; }

/* 제목 체계 */
h1 { 48px, font-weight: 900, letter-spacing: -0.02em }
h2 { 32px, font-weight: 700, letter-spacing: -0.01em }
h3 { 24px, font-weight: 700 }
h4 { 20px, font-weight: 600 }

/* 카드 내부 */
.card-title { 18px, font-weight: 600 }
.card-desc { 16px, font-weight: 400 }
```

### 4.3 컴포넌트 개선 우선순위

1. **버튼 시스템**: 각진 버튼 → `rounded-xl` + 충분한 패딩
2. **카드 구조**: 배경 컬러 카드 → 흰 카드 + 상단 컬러 라인
3. **아이콘 크기**: 현재 w-6 h-6 → w-8 h-8 (가독성 향상)
4. **그림자**: 진한 그림자 → `shadow-sm` 미니멀 접근
5. **여백**: 전체적으로 padding/margin 20% 확대

---

## 5. 바로 구현 가능한 우선순위 5개

### 1순위: 컬러 시스템 전면 교체
```css
/* globals.css 수정 */
:root {
  --color-primary: #1a3a5c;     /* 기존 #06153a */
  --color-accent: #2e7d32;      /* 기존 #e85d04 */
  --color-cta: #e65100;         /* 신규 */
  --color-background: #fafaf8;  /* 기존 white */
  --color-text: #2c3e50;        /* 기존 gray-700 */
}
```

### 2순위: 히어로 섹션 배경 변경
```tsx
// app/page.tsx의 히어로 섹션
// 현재: bg-gradient-to-br from-navy-900 to-navy-800
// 변경: bg-gradient-to-br from-background to-cream-100
```

### 3순위: 핵심분야 카드 디자인 변경
```tsx
// 현재: bg-navy-900 text-white 카드
// 변경: bg-white border-t-4 border-accent 카드
```

### 4순위: CTA 버튼 스타일 통일
```tsx
// 모든 버튼 클래스
// 현재: rounded-md
// 변경: rounded-xl bg-cta hover:bg-cta-dark px-8 py-3
```

### 5순위: 전체 폰트 크기 확대 (중장년 친화)
```css
/* 기본 폰트 크기 16px → 18px */
html { font-size: 18px; }
.text-sm { font-size: 16px; }  /* 기존 14px */
.text-base { font-size: 18px; } /* 기존 16px */
```

---

## 6. 절대 따라하지 말 것

### 6.1 과도한 인터랙션/애니메이션
- ❌ **WebGL 3D 효과**: 시민단체에 부적절하고 40~60대 타겟에 거부감
- ❌ **Parallax 스크롤링**: 가독성 저해, 모바일에서 성능 문제
- ❌ **복잡한 호버 애니메이션**: 신뢰감보다는 트렌디함을 추구하는 느낌

### 6.2 스타트업/테크 스타일
- ❌ **네온 컬러/그라디언트**: 공익기관에 경솔한 느낌
- ❌ **모던 일러스트**: 진부하고 개성 없음
- ❌ **대시보드형 UI**: SaaS 플랫폼 느낌으로 교육 사이트에 부적절

### 6.3 트렌디한 디자인 요소
- ❌ **Brutalism/실험적 타이포**: 가독성 저해
- ❌ **극단적 미니멀리즘**: 정보 전달력 약화
- ❌ **Z세대 타겟 컬러**: 핫핑크, 전기 블루 등 주 타겟층에 거부감

### 6.4 상업적/마케팅 톤
- ❌ **과도한 판매 문구**: "최고", "혁신적", "완벽한" 등
- ❌ **공격적 CTA**: "지금 바로", "놓치지 마세요" 등
- ❌ **카운트다운/한정 이벤트**: 공익성과 상충

### 6.5 한국 정서에 맞지 않는 요소
- ❌ **서구식 빨강/파랑 조합**: 미국 정치 색깔 연상
- ❌ **과도한 개인주의 메시지**: 한국 시민사회 정서와 거리감
- ❌ **청년층만 고려한 UI**: 40~60대 소외감 조성

---

## Sources:
- [NonProfit Websites - Awwwards](https://www.awwwards.com/awwwards/collections/nonprofit-websites/)
- [Business / Corporate Websites | Best Web Design](https://www.awwwards.com/websites/business-corporate/)
- [Hero Section designs, themes, templates and downloadable graphic elements on Dribbble](https://dribbble.com/tags/hero-section)
- [23 Best Nonprofit Website Designs That Drive Impact and Inspire Action in 2026](https://imagexmedia.com/blog/best-nonprofit-website-designs-drive-impact)
- [Top 10 Minimalist Web Design Trends For 2026](https://www.digitalsilk.com/digital-trends/minimalist-web-design-trends/)
- [아름다운재단](https://beautifulfund.org/)
- [세상을 바꾸는 시민의 힘 - 참여연대](https://peoplepower21.org/)
- [Sites Of The Day - Awwwards](https://www.awwwards.com/websites/sites_of_the_day/)