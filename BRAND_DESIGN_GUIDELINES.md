# 대전경실련 도시안전디자인포럼 브랜드 디자인 가이드라인

**브랜드명**: 대전경실련 도시안전디자인포럼  
**영문명**: Urban Safety Design Forum  
**설립**: 2024  
**성격**: 시민공익단체 (경실련 산하)  

---

## 1. 브랜드 정체성 (Brand Identity)

### 1.1 브랜드 미션
도시 안전을 위한 실질적 디자인 솔루션을 연구하고 시민들에게 안전 교육을 제공하는 전문 포럼

### 1.2 브랜드 가치
- **전문성** (Expertise): 35년 경실련 공신력 기반
- **혁신성** (Innovation): 디자인을 통한 안전 솔루션
- **시민성** (Civic): 시민 중심 공익 활동
- **신뢰성** (Trust): 검증된 교육과 인증 시스템

### 1.3 브랜드 포지셔닝
> "도시 안전을 디자인으로 혁신하는 시민 전문가 집단"

---

## 2. 컬러 시스템 (Color System)

> **변경 이력**
> - **2026-04-15**: Smart Teal `#00B5AD` → **Navy `#1a3a5c` + Safety Green `#2e7d32`** 2축 체계로 전환
> - 결정 근거: `docs/BRAND_PALETTE_DECISION.md`
> - 사유: (1) "안전"이라는 조직 미션과 의미 일치, (2) 이미 38곳 구현 완료로 재작업 비용 최소, (3) 40-60대 타겟 친숙도, (4) 공공·시민단체 관행 부합

### 2.1 브랜드 컬러 팔레트

#### Primary — Navy (구조·권위)
```css
/* Deep Navy — 메인 브랜드 컬러 */
--color-navy-900: #1a3a5c;    /* ★ Core */
--color-navy-950: #0d1829;    /* 최다크 */
--color-navy-800: #2b4870;    /* 서브 */
--color-navy-700: #3c5687;    /* 호버·링크 */
--color-navy-600: #4d649e;    /* 보조 */
--color-navy-100: #d4e2f4;    /* 배경 틴트 */
--color-navy-50:  #f0f6fc;    /* 최연한 */
```

#### Accent — Safety Green (안심·액션)
```css
/* Safety Green — 보조 브랜드 컬러 */
--color-green-700: #2e7d32;   /* ★ Core */
--color-green-800: #1b5e20;   /* 다크 액센트 */
--color-green-600: #388e3c;   /* CTA 기본 */
--color-green-500: #43a047;   /* CTA 호버·강조 */
--color-green-100: #c8e6c9;   /* 배지·연한 배경 */
--color-green-50:  #e8f5e8;   /* 최연한 */
```

#### Warning — Amber (제한 사용)
```css
/* Amber — 경고·면책 전용 */
--color-amber-600: #ff6f00;   /* ★ Core */
--color-amber-700: #e65100;
--color-amber-500: #ff8f00;
--color-amber-100: #ffcc80;
--color-amber-50:  #fff8e1;
```

#### Neutral
```css
--color-bg:       #fafaf8;    /* 크림 배경 */
--color-text:     #2c3e50;    /* 소프트 다크 본문 */
--color-gray-900: #2c3e50;
--color-gray-800: #34495e;
--color-gray-600: #4b5563;
--color-gray-400: #9ca3af;
--color-gray-200: #e5e7eb;
```

### 2.2 컬러 사용 규칙

#### Navy `#1a3a5c` — Primary
- **용도**: 헤더, 페이지 히어로, 주요 타이틀, 푸터, 구조 요소
- **적용**: `h1`·`h2` 헤딩 텍스트, 네비게이션, 카드 헤더, 섹션 구분
- **금지**: 본문 텍스트(대신 gray-900 사용), 대형 CTA 버튼(대신 Green 사용)

#### Safety Green `#2e7d32` — Accent
- **용도**: **1차 CTA 버튼**, 강조 텍스트, 체크마크, 성공 상태, 포인트 요소
- **적용**: 「수강 신청」·「문의하기」 등 주요 액션, 체크 아이콘, 섹션 구분선 하이라이트, 링크 호버
- **버튼 규칙**: 배경 `green-700` + 흰색 텍스트, 호버 시 `green-800`
- **금지**: 본문 텍스트, 대면적 배경(작은 섹션 블록만 허용)

#### Amber `#ff6f00` — Warning (제한 사용)
- **허용 용도만**:
  - 민간자격 면책 고지 배너 (`certificates/page.tsx`, `disclosure/page.tsx`)
  - 환불 규정 경고 박스 (`refund/page.tsx`, `voice-phishing/page.tsx` 자격정보)
  - 교육 일정 "잔여 N석" 마감임박 상태 배지
  - PPT 파일 타입 아이콘 (파일 포맷 관례, 예외 허용)
- **금지 용도**: 일반 CTA, 히어로 강조, 링크, 아이콘 포인트

#### Pure White `#FFFFFF` / Cream `#fafaf8` — Background
- **용도**: 본문 배경, 카드 배경, 버튼 내부, 여백
- **필수**: 충분한 여백과 숨쉬는 공간 확보, 40-60대 가독성 우선

### 2.3 컬러 접근성 (WCAG 2.1)

| 조합 | 대비율 | 기준 |
|---|---|---|
| Navy-900 on White | **10.8 : 1** | ✅ AAA |
| Navy-900 on Cream `#fafaf8` | **10.5 : 1** | ✅ AAA |
| Green-700 on White | 5.4 : 1 | ✅ AA (18px+ 권장) |
| Green-800 on White | **8.2 : 1** | ✅ AAA |
| White on Green-700 | 5.4 : 1 | ✅ AA |
| White on Green-800 | **8.2 : 1** | ✅ AAA |
| Amber-600 on White | 3.1 : 1 | ⚠️ **경고 박스 전용** (큰 글씨 + 아이콘 병기 필수) |

**색각 이상자 배려**
- Navy + Green 조합은 적록색맹자에게도 명도 차이로 구분 가능
- 모든 상태 표시는 **색상만으로 전달 금지**, 아이콘 + 텍스트 병기 필수

### 2.4 CTA 버튼 시스템

```
1차 CTA (수강 신청, 지금 시작하기, 문의하기)
├─ 배경: green-700 (#2e7d32)
├─ hover: green-800 (#1b5e20)
├─ 텍스트: white
├─ padding: px-6 py-3 (모바일), px-8 py-4 (데스크톱)
└─ shadow: 0 8px 25px rgba(46, 125, 50, 0.3)

2차 CTA (자세히 보기, 더 알아보기)
├─ 배경: white
├─ border: 2px solid navy-700
├─ hover: navy-50 배경
└─ 텍스트: navy-900

텍스트 링크 (본문 내 링크, 메뉴)
├─ 텍스트: green-700
├─ hover: green-800 + underline
└─ 방문: 동일 (방문 구분 미사용)

위험·경고 박스 (면책, 환불, 마감)
├─ 배경: amber-50
├─ border-left: 4px solid amber-600
├─ 텍스트: amber-800 또는 navy-900
└─ 아이콘 필수 (AlertTriangle, Info 등)
```

---

## 3. 타이포그래피 (Typography)

### 3.1 폰트 패밀리

#### Primary Font
```css
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
```

#### Fallback Font  
```css  
font-family: 'Noto Sans KR', 'Pretendard', sans-serif;
```

### 3.2 폰트 사이즈 체계

#### 슬라이드용 타이포그래피
```css
/* 메인 타이틀 (국문) */
.main-title {
    font-size: 80px;
    font-weight: 800;
    color: var(--brand-gray);
    letter-spacing: -2px;
    line-height: 0.9;
}

/* 서브 타이틀 (영문) */
.sub-title {
    font-size: 34px;
    font-weight: 500;  
    color: var(--brand-teal);
    letter-spacing: 1px;
    text-transform: uppercase;
    line-height: 1.2;
}
```

#### 웹사이트용 타이포그래피  
```css
/* H1 - 페이지 타이틀 */
h1 { font-size: 48px; font-weight: 800; color: var(--brand-gray); }

/* H2 - 섹션 타이틀 */  
h2 { font-size: 36px; font-weight: 700; color: var(--brand-gray); }

/* H3 - 서브섹션 */
h3 { font-size: 24px; font-weight: 600; color: var(--brand-gray); }

/* Body - 본문 */
p { font-size: 18px; font-weight: 400; color: var(--brand-gray); line-height: 1.7; }

/* Caption - 영문 서브타이틀 */
.caption { font-size: 16px; font-weight: 500; color: var(--brand-teal); }
```

### 3.3 타이포그래피 원칙
1. **계층 구조**: 국문 타이틀 > 영문 서브타이틀 > 본문
2. **컬러 구분**: 국문(Gray), 영문 강조(Teal), 본문(Gray)  
3. **가독성**: 충분한 행간(1.7), 적절한 자간
4. **일관성**: 모든 매체에서 동일한 폰트 위계 유지

---

## 4. 레이아웃 시스템 (Layout System)

### 4.1 슬라이드 레이아웃 (16:9)

#### 기본 구조
```
┌─────────────────────────────────────┐
│                                     │
│           [로고 영역]                │  
│                                     │
│        [메인 타이틀 - 국문]          │
│      [서브 타이틀 - 영문 Teal]       │
│                                     │
│                                     │
└─────────────────────────────────────┘
  ████████████████████████████████████   ← Teal Bar (15px)
```

#### 치수 및 여백
- **슬라이드 크기**: 1280px × 720px (16:9)
- **로고 영역**: 320px width (중앙 정렬)
- **텍스트 영역**: 중앙 정렬, 상하 40px 여백
- **하단 강조 바**: 100% width × 15px height

### 4.2 웹사이트 레이아웃

#### 그리드 시스템
- **컨테이너**: max-width 1200px, 중앙 정렬
- **여백**: 좌우 20px (모바일), 40px (태블릿), 80px (데스크톱)
- **섹션 간격**: 80px (데스크톱), 60px (태블릿), 40px (모바일)

#### 구성 요소
```css
/* 헤더 */
.header {
    height: 80px;
    background: var(--brand-white);
    border-bottom: 2px solid var(--brand-teal);
}

/* 메인 콘텐츠 */
.main-content {
    padding: 60px 0;
    background: var(--brand-white);
}

/* 푸터 */
.footer {
    background: var(--brand-gray);
    color: var(--brand-white);
    padding: 40px 0;
}
```

### 4.3 레이아웃 원칙
1. **안정감**: 하단 Teal 바로 시각적 안정성 확보
2. **여백**: 넉넉한 화이트 스페이스로 고급스러움 연출
3. **중앙 정렬**: 모든 주요 요소는 중앙 정렬 기본
4. **일관성**: 모든 매체에서 동일한 구조적 위계

---

## 5. 로고 및 심볼 (Logo & Symbol)

### 5.1 로고 사용 규칙

#### 기본 사양
- **파일 포맷**: SVG(웹), PNG(인쇄), JPG(배경)
- **최소 크기**: 120px width (웹), 30mm width (인쇄)
- **보호 영역**: 로고 높이의 0.5배만큼 사방 여백

#### 실제 로고 파일 사용
- **표준 로고 파일**: `Urban_Safety_Design_202604111008_2.jpg`
- **필수 사용**: 모든 공식 매체에서 실제 로고 파일을 사용해야 함
- **임시 심볼 금지**: 텍스트 기반 임시 심볼이나 placeholder 이미지 사용 금지
- **파일 경로**: 로고 파일이 프로젝트 루트 또는 지정된 assets 폴더에 위치해야 함

#### 컬러 버전
1. **풀컬러**: Teal + Gray 조합 (기본)
2. **단색**: Gray 버전 (단색 인쇄)  
3. **화이트**: 어두운 배경용
4. **블랙**: 단색 인쇄용

### 5.2 로고 금지 사항
- ❌ 비율 변경 (가로/세로 늘림)
- ❌ 컬러 임의 변경
- ❌ 외곽선 추가
- ❌ 그림자 효과 추가
- ❌ 회전, 기울임
- ❌ 다른 요소와 겹침

---

## 6. UI 컴포넌트 (UI Components)

### 6.1 버튼 시스템

#### Primary Button
```css
.btn-primary {
    background: var(--brand-teal);
    color: var(--brand-white);
    padding: 16px 32px;
    border-radius: 8px;
    font-weight: 600;
    border: none;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: #009B94; /* Teal 90% */
    transform: translateY(-2px);
}
```

#### Secondary Button  
```css
.btn-secondary {
    background: transparent;
    color: var(--brand-teal);
    border: 2px solid var(--brand-teal);
    padding: 14px 30px;
    border-radius: 8px;
}
```

### 6.2 카드 컴포넌트
```css
.card {
    background: var(--brand-white);
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.card-accent {
    border-top: 4px solid var(--brand-teal);
}
```

### 6.3 강조 바 (Accent Bar)
```css
.accent-bar {
    width: 100%;
    height: 15px;
    background: var(--brand-teal);
    position: relative;
    margin: 0;
}

/* 섹션 구분용 미니 바 */
.mini-accent {
    width: 60px;
    height: 4px;
    background: var(--brand-teal);
    margin: 0 auto 20px;
}
```

---

## 7. 애플리케이션 가이드 (Application Guide)

### 7.1 슬라이드/프레젠테이션
- **배경**: 항상 Pure White
- **제목**: Slate Gray, 80px, 굵게
- **서브타이틀**: Teal, 34px, 중간 굵기
- **하단바**: 필수 적용 (15px Teal)
- **로고**: 상단 중앙, 320px 크기

### 7.2 웹사이트  
- **헤더**: White 배경, Teal 하단 보더
- **본문**: Gray 텍스트, 충분한 여백
- **CTA**: Teal 버튼, 호버 효과
- **푸터**: Gray 배경, White 텍스트

### 7.3 인쇄물
- **명함**: White 배경, Teal 포인트
- **브로셔**: Teal 강조, Gray 본문  
- **수료증**: 격식, Teal 도장/서명란

### 7.4 디지털 매체
- **SNS**: Teal 배경, White 텍스트 조합 활용
- **이메일**: White 배경, Teal 헤더
- **앱**: Teal 네비게이션, White 콘텐츠

---

## 8. MECE 검토 및 품질 관리

### 8.1 MECE 원칙 적용 결과

#### Mutually Exclusive (상호 배타적)
- ✅ 컬러 역할이 명확히 구분됨 (Teal=강조, Gray=텍스트, White=배경)
- ✅ 타이포그래피 위계가 겹치지 않음 (메인/서브/본문)
- ✅ 레이아웃 영역이 중복되지 않음 (헤더/메인/푸터)

#### Collectively Exhaustive (전체 망라적)  
- ✅ 모든 매체 커버 (슬라이드/웹/인쇄/디지털)
- ✅ 모든 컴포넌트 정의 (버튼/카드/바/로고)
- ✅ 모든 상황 고려 (일반/호버/액티브 상태)

### 8.2 품질 검증 체크리스트

#### 브랜드 일관성
- [ ] 모든 매체에서 동일한 Teal (#00B5AD) 사용
- [ ] Pretendard 폰트 우선 적용
- [ ] 하단 강조 바 모든 슬라이드에 적용
- [ ] 16:9 비율 모든 슬라이드에서 유지

#### 접근성 준수  
- [ ] 컬러 대비율 AA 기준 이상 유지
- [ ] 폰트 크기 최소 18px (웹 본문)
- [ ] 터치 타겟 최소 44px
- [ ] 키보드 네비게이션 지원

#### 기술적 구현
- [ ] CSS 변수로 컬러 시스템 정의
- [ ] SVG 로고로 해상도 무관 품질
- [ ] 반응형 디자인 지원
- [ ] 다크모드 대응 (선택적)

---

## 9. 버전 및 업데이트

**문서 버전**: v1.0  
**최종 수정**: 2026-04-11  
**다음 검토**: 2026-07-11 (분기별)  
**승인**: 대전경실련 도시안전디자인포럼  

### 변경 이력
- v1.0 (2026-04-11): 초기 브랜드 가이드라인 수립

---

## 10. 연락처 및 문의

**브랜드 가이드라인 문의**: 042-254-8060  
**디자인 에셋 요청**: design@urbansafety.or.kr  
**기술 지원**: tech@urbansafety.or.kr

---

*본 가이드라인은 대전경실련 도시안전디자인포럼의 공식 브랜드 표준으로, 모든 커뮤니케이션 활동에서 준수해야 할 필수 기준입니다.*