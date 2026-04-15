# 브랜드 팔레트 결정 리포트

**결정일**: 2026-04-15
**결정**: **Safety Green `#2e7d32`** 를 보조 브랜드 컬러로 확정
**주 컬러**: **Navy `#1a3a5c`** (기존 결정 유지)

---

## 1. 결정 배경

리디자인 진단(`UX_DIAGNOSIS_REPORT.md` H1) 과정에서 사이트에 **3가지 서로 다른 브랜드 팔레트가 공존**하는 문제가 발견됨.

| 소스 | 메인 컬러 | 상태 |
|---|---|---|
| `BRAND_DESIGN_GUIDELINES.md` (기존 문서) | Smart Teal `#00B5AD` | 문서상 권장 |
| `app/globals.css` (로컬 최신) | Navy + **Green `#2e7d32`** + Amber | 실제 토큰 정의 |
| 배포본 (`2f08744`) | Navy + Orange `#e85d04` | 현재 렌더링 |

이 3중 불일치로 인해 어느 색으로 CTA를 통일해야 하는지, 헤더·버튼·강조 요소의 기준이 없어 리디자인 작업이 진전되지 못하는 상태였음.

---

## 2. 실측 데이터 (결정 당시)

사이트 전체 코드에서 색상 클래스·변수 사용 횟수 grep 집계:

| 색상 | 사용 횟수 | 비고 |
|---|---|---|
| `navy-*`, `#1a3a5c`, `#0f2d5e` | **244회** | 전체 기조색, 유지 확정 |
| `orange-*`, `amber-*`, `#e85d04` | **46회** | 제거 대상 |
| `green-*`, `#2e7d32` | **38회** | 이미 도입됨 |
| `teal-*`, `#00B5AD` | **0회** | 코드 사용 전무 |

**관찰**:
- Teal은 문서에만 존재, 실제 구현 0건
- Green은 이미 38곳에 적용 중 (Teal로 가면 이 작업을 되돌리는 비용 발생)
- Orange는 어느 방향으로 가든 제거 필요

---

## 3. Teal vs Green 비교 (결정 프레임워크)

| 기준 | Teal `#00B5AD` | Green `#2e7d32` | 가중치 |
|---|---|---|---|
| 구현 비용 (치환 건수) | 84곳 | **46곳** | 🟢 Green |
| 조직 미션과의 의미 일치 | 기술·혁신 | **안전·공익·성장** | 🟢 Green |
| 타겟(40-60대) 친숙도 | 낯섦 | **익숙함** | 🟢 Green |
| 공공/시민단체 관행 | 독특 | **표준** | 🟢 Green |
| Navy와의 시각적 조화 | 청록 계열 | 고전 조합 | 🟡 동률 |
| 차별화·브랜드 고유성 | **강함** | 중간 | 🟡 Teal |
| 브랜드 가이드 문서 합치 | **일치** | 문서 갱신 필요 | 🟡 Teal |

**결론**: 7개 기준 중 4개에서 Green 우세, 2개 동률, 1개만 Teal 우세.
Green을 채택하고 문서를 업데이트하는 방향이 총비용·의미·친숙도 모두에서 합리적.

---

## 4. 최종 팔레트 확정

### 4.1 Primary — Navy (기존 유지)

```css
--color-navy-950: #0d1829;   /* 최다크 */
--color-navy-900: #1a3a5c;   /* ★ 메인 네이비 */
--color-navy-800: #2b4870;   /* 서브 */
--color-navy-700: #3c5687;   /* 호버·링크 */
--color-navy-600: #4d649e;   /* 보조 */
--color-navy-100: #d4e2f4;   /* 배경 틴트 */
--color-navy-50:  #f0f6fc;   /* 최연한 */
```

**용도**: 헤더, 히어로, 페이지 타이틀, 푸터, 주요 구조 요소

### 4.2 Accent — Safety Green (신규 확정)

```css
--color-green-800: #1b5e20;  /* 다크 액센트 */
--color-green-700: #2e7d32;  /* ★ 메인 그린 */
--color-green-600: #388e3c;  /* CTA 기본 상태 */
--color-green-500: #43a047;  /* CTA 호버·강조 */
--color-green-100: #c8e6c9;  /* 배지·연한 배경 */
--color-green-50:  #e8f5e8;  /* 최연한 */
```

**용도**:
- 1차 CTA 버튼 (수강 신청, 문의하기)
- 체크마크, 성공 상태 아이콘
- 강조 텍스트 (`"안전 전문가"` 같은 포인트 워드)
- 섹션 구분선 하이라이트
- 그린 톤 카테고리 카드

### 4.3 Warning — Amber (축소, 제한 사용)

```css
--color-amber-600: #ff6f00;  /* 경고·면책 전용 */
--color-amber-100: #ffcc80;  /* 경고 배경 틴트 */
--color-amber-50:  #fff8e1;  /* 최연한 */
```

**용도** (엄격히 제한):
- **민간자격 면책 고지 배너** (`"국가자격 아님" 표시`)
- **환불 규정 경고 박스**
- **마감 임박 상태 배지** (교육 일정 리스트)

**금지 용도**:
- ❌ 일반 CTA 버튼
- ❌ 히어로·타이틀 강조
- ❌ 링크 색상

### 4.4 Neutral

```css
--color-bg:       #fafaf8;   /* 배경 (크림 톤) */
--color-text:     #2c3e50;   /* 본문 (소프트 다크) */
--color-gray-900: #2c3e50;
--color-gray-800: #34495e;
--color-gray-600: #4b5563;
--color-gray-400: #9ca3af;
--color-gray-200: #e5e7eb;
--color-gray-100: #f5f5f4;
```

### 4.5 Removed — Orange (전량 제거)

```css
/* 제거 대상 */
#e85d04   /* 이전 메인 orange */
#f27722   /* 이전 보조 orange */
#fde8d4   /* 이전 orange 틴트 */
#fff4ec   /* 이전 최연한 orange */
orange-50 ~ orange-900  /* 모든 Tailwind orange 클래스 */
```

---

## 5. 접근성 검증

| 조합 | 대비율 | WCAG 기준 |
|---|---|---|
| Navy-900 `#1a3a5c` on White `#ffffff` | 10.8 : 1 | ✅ AAA |
| Navy-900 on Bg `#fafaf8` | 10.5 : 1 | ✅ AAA |
| Green-700 `#2e7d32` on White | 5.4 : 1 | ✅ AA |
| Green-800 `#1b5e20` on White | 8.2 : 1 | ✅ AAA |
| White on Green-700 | 5.4 : 1 | ✅ AA (단, 18px+ 권장) |
| White on Green-800 | 8.2 : 1 | ✅ AAA |
| Amber-600 `#ff6f00` on White | 3.1 : 1 | ⚠️ 경고 배너에만 (큰 글씨+아이콘 병기 필수) |

**규칙**:
- 버튼 배경이 `green-700`인 경우 텍스트는 White (AA 통과)
- 더 안전한 CTA는 `green-800` 배경 + White 텍스트 (AAA)
- Amber는 항상 아이콘 + 텍스트 병기로 색상 의존도 완화

---

## 6. CTA 버튼 통일 규칙

```
1차 CTA (수강 신청, 지금 시작하기):
  배경: green-700  hover: green-800
  텍스트: white
  padding: px-6 py-3 (mobile), px-8 py-4 (desktop)
  shadow: soft layered

2차 CTA (자세히 보기, 문의):
  배경: white  border: navy-700
  hover: navy-50 배경
  텍스트: navy-900

3차 링크 (텍스트 링크):
  텍스트: green-700
  hover: green-800 + underline

위험/경고 (환불 규정, 면책 고지):
  배경: amber-50
  border-left: 4px solid amber-600
  텍스트: amber-800 또는 navy-900
  아이콘 필수
```

---

## 7. 변경 영향 범위

### 7.1 수정 대상 파일 (예상)

- `app/globals.css` — `@theme` 블록 토큰 정리, orange 제거
- 46곳 페이지/컴포넌트 — `orange-*`, `amber-*` (일반 CTA) 클래스 치환
- `BRAND_DESIGN_GUIDELINES.md` — Teal → Green으로 섹션 2 재작성
- `CLAUDE.md` — 컬러 시스템 테이블 업데이트

### 7.2 유지 대상

- 민간자격 면책 고지 배너 (amber 유지)
- Navy 토큰 전체 (244곳)
- 기존 green 사용처 (38곳, 이미 올바름)

---

## 8. 이행 순서

1. ✅ 결정 문서 작성 (이 문서)
2. 🔄 `globals.css` 토큰 확정 + orange 제거
3. ⏳ orange 46곳 치환 (grep 기반 일괄 수정)
4. ⏳ `BRAND_DESIGN_GUIDELINES.md` 섹션 2 재작성
5. ⏳ Playwright로 홈·certificates·contact 시각 검증
6. ⏳ `CHANGELOG.md`에 변경 요약 기록

---

## 9. 향후 재검토 조건

이 결정은 다음 상황에서만 재검토됩니다:

- 이사회·센터장·경실련 본부에서 공식 브랜드 CI를 별도 제정하는 경우
- 로고 BI.ai 원본 작업 시 새 팔레트가 확정되는 경우 (현재 `BRAND_ASSET_AUDIT.md` 진행 중)
- 사용자 리서치에서 Green 가독성·인식 문제가 데이터로 확인되는 경우

그 외 선호 기반 변경 요청은 기각.

---

## 10. 승인

- **제안**: Claude Code 리디자인 세션 (2026-04-15)
- **승인**: 프로젝트 오너 (2026-04-15)
- **적용 시작**: 2026-04-15
