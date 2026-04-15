# 브랜드 자산 감사 리포트 — urban-safety-website

**작성일**: 2026-04-15
**결론**: **Adobe Illustrator 원본 파일로 브랜드 자산을 다시 작업해야 합니다.**
현재 `public/brand/`에 들어 있는 일부 파일은 원본 없이 임의 변형된 상태이며, 웹에서 요구되는 핵심 변형본(가로형 워드마크, 정사각형 파비콘 등)이 부족합니다.

---

## 0. 왜 Illustrator로 돌아가야 하는가

### 근거 1: 원본 엠블럼은 세로 1:1.41 비율
- `logo_original.png` 595×842 → 방패형 엠블럼 + 하단 리본 구조
- 웹 헤더·파비콘·앱 아이콘은 대부분 **정사각형** 또는 **가로형**을 요구
- 현재 사이트는 이 세로형 엠블럼을 44×44 정사각 박스에 **강제로 욱여넣어** 디테일이 뭉개짐

### 근거 2: public/brand/에 "원본에 없는 파일들"이 존재
| 파일 | 비율·포맷 | Google Drive 원본 존재 여부 |
|---|---|---|
| `logo.jpg` (1024×1024) | 정사각 JPEG | ❌ 없음 |
| `logo-mark.jpg` (500×500) | 정사각 JPEG | ❌ 없음 |
| `logo-512.png` (512×512) | **이름은 .png, 실제 JPEG** | ❌ 없음 |
| `og-image.jpg` (1200×1200) | 정사각 JPEG | ❌ 없음 |

→ 세로 엠블럼을 누군가가 **임의로 크롭·리사이즈·포맷 변환**해서 만든 파일들.
→ 출처·제작 규정 불명. **브랜드 사용 가이드라인 위반 가능성**.
→ 따라서 **공식 원본(.ai) 기반으로 다시 만들어야 함**.

### 근거 3: 파비콘·Apple Touch Icon 비율 왜곡
`app/layout.tsx`:
```tsx
icons: {
  icon: [{ url: '/brand/logo-favicon.png', sizes: '45x64' }],   // 세로형
  apple: [{ url: '/brand/logo-header.png' }],                   // 141×200 세로형
}
```
→ 정사각형 표준을 따르지 않아 **iOS 홈 화면·브라우저 탭에서 크롭/왜곡 발생**.

### 근거 4: 공식 명칭 혼선
- 원본 로고 리본: **`URBAN SAFETY DESIGN CENTER`**
- `CLAUDE.md` / `BRAND_DESIGN_GUIDELINES.md`: `Urban Safety Design Forum`
- Header 텍스트: "대전경실련 / 도시안전디자인센터" (원본 로고에 "대전경실련" 없음)

→ **Illustrator 작업 전에 정식 기관명·영문명·경실련 병기 여부 먼저 확정** 필요.

---

## 1. 원본 자산 인벤토리 (Google Drive)

**경로**: `/Users/mac/Library/CloudStorage/GoogleDrive-seiyeolo@gmail.com/내 드라이브/대전경실련도시안전디자인센터/로고BI/`

| 파일 | 타입 | 용도 | 비고 |
|---|---|---|---|
| **`사단법인 도시안전디자인센터 BI.ai`** | Illustrator | **마스터 원본** | 모든 변형의 소스 |
| `명함통.ai` | Illustrator | 명함 템플릿 | 인쇄물 |
| `위촉장 및 상장.ai` | Illustrator | 위촉장/상장 | 인쇄물 |
| `(푸른솔애드)도시안전디자인센터 출범식 현수막_...ai` | Illustrator | 현수막 | 인쇄물 |
| `SVG/Artboard 1.svg` | SVG | 벡터 내보내기 | 106×150 (세로) |
| `logo_original.png` | PNG | 원본 래스터 | 595×842 |
| `logo_og.png` | PNG | OG 이미지 | 362×512 |
| `logo-header.png` | PNG | (이름만 header) | 141×200, 실제로는 헤더용 아님 |
| `logo_favicon.png` | PNG | (이름만 favicon) | 45×64, 정사각 아님 |

**관찰**: 원본 폴더에 제공되는 PNG들은 전부 **단순히 엠블럼을 래스터화**한 것일 뿐, **정사각형 파비콘 / 가로형 워드마크 / 화이트 모노 버전** 같은 웹 필수 변형본은 없음. **Illustrator 원본에서 추가 변형본을 내보내야 함**.

---

## 2. 웹에 필요한 변형본 (Illustrator에서 재작업 목록)

### A. 헤더용 — 가로형 워드마크 (최우선)
```
파일명: logo-wordmark-horizontal.svg
구성: [엠블럼 축소] + [대전경실련 도시안전디자인센터]
비율: 가로 4~5 : 세로 1
최소 크기: 가로 160px @ 1x
색상 버전:
  - color (풀컬러, 라이트 배경용)
  - white (네이비/다크 배경용)
  - mono-navy (단색 네이비)
출력: SVG (viewBox 명시), PNG @2x (백업)
```

### B. 파비콘·앱 아이콘용 — 정사각형 마크
```
파일명: favicon-mark.svg (+ 래스터 사이즈별)
구성: 방패 엠블럼만 (리본·텍스트 제거)
   OR 엠블럼 + padding 정사각 캔버스
비율: 1:1
사이즈: 16, 32, 48, 192, 512
색상 버전: 풀컬러만
출력:
  - favicon.ico (16/32/48 멀티 사이즈)
  - favicon-192.png, favicon-512.png (PWA 매니페스트용)
  - apple-touch-icon.png 180×180 (iOS)
  - safari-pinned-tab.svg (단색 모노)
```

### C. OG 이미지 — 소셜 공유용
```
파일명: og-image.png
구성: 엠블럼 + "대전경실련 도시안전디자인센터" + "가족을 믿고 맡길 수 있는 우리 동네 안전 전문가"
비율: 1200×630 (페이스북·카카오톡 표준)
배경: 네이비 또는 크림 배경에 엠블럼 + 타이포
출력: PNG 1장 + 다크·라이트 변형
```

### D. 이메일·서명·인쇄 보조
```
- logo-footer-wordmark.svg (푸터용, 라이트톤 가로형)
- logo-email-signature.png (320×120, 이메일 서명용)
- logo-print-mono.ai (1색 인쇄용, 블랙 솔리드)
```

### E. 브랜드 사용 규정 (최소 1페이지)
```
- 최소 크기 (가로형/정사각형 각각)
- 여백 규칙 (엠블럼 높이의 1/4 이상 공백)
- 배경색별 버전 선택 규칙
- 금지 변형 (찌그러뜨리기, 회전, 색상 변경, 그림자 등)
- 단독 엠블럼 vs 워드마크 사용 기준
```

---

## 3. 작업 순서 제안

### Step 1 — 명칭·영문명 확정 (디자이너 진입 전)
- [ ] 정식 기관명: "대전경실련 도시안전디자인**센터**"
- [ ] 영문명 1개 선택: `Urban Safety Design Center` (원본 로고 리본과 일치)
- [ ] 로고 병기 방식: "엠블럼만" vs "엠블럼+워드마크" 결정

### Step 2 — Illustrator 작업 (디자이너)
원본 `사단법인 도시안전디자인센터 BI.ai`를 열어서:
- [ ] A. 가로형 워드마크 3종 (color/white/mono)
- [ ] B. 정사각형 파비콘 마크 (단독 엠블럼 버전)
- [ ] C. OG 이미지 1200×630
- [ ] D. 푸터용/이메일용 보조 버전
- [ ] E. 브랜드 사용 규정 1페이지 PDF

### Step 3 — 파일 내보내기·네이밍 규칙
```
public/brand/
├── wordmark-color.svg           # 헤더 기본
├── wordmark-white.svg           # 다크 배경용
├── wordmark-mono.svg            # 단색
├── mark-only.svg                # 엠블럼만
├── favicon.ico                  # 16/32/48 멀티
├── favicon-192.png              # PWA
├── favicon-512.png              # PWA
├── apple-touch-icon.png         # 180x180
├── safari-pinned-tab.svg        # 모노
├── og-image.png                 # 1200x630
└── README.md                    # 사용 가이드 요약
```

기존 `logo.jpg`, `logo-mark.jpg`, `logo-512.png`, `og-image.jpg`, `logo-header.png`, `logo-favicon.png`, `logo-og.png`, `logo.svg` → **전량 제거**

### Step 4 — 코드 반영
- [ ] `components/Header.tsx` — 44×44 박스 제거 → 가로형 워드마크 자연 비율
- [ ] `app/layout.tsx` — `icons` 메타데이터 신규 파비콘 경로로 교체
- [ ] `public/site.webmanifest` 추가 (PWA 아이콘 정의)
- [ ] `components/Footer.tsx` — 워드마크 모노/화이트 버전 적용 (현재는 텍스트 only)

### Step 5 — 검증
- [ ] 데스크톱 1440 / 태블릿 768 / 모바일 375 헤더 렌더 확인
- [ ] `favicon.ico` 브라우저 탭 확인
- [ ] iOS 홈 화면 추가해서 apple-touch-icon 확인
- [ ] 카카오톡·페이스북 링크 미리보기 OG 이미지 확인

---

## 4. 디자이너에게 전달할 요약 메시지

> **안녕하세요, urban-safety-website 리디자인 작업 중 로고 자산에 문제가 발견되어 전달드립니다.**
>
> 현재 웹사이트 `public/brand/` 폴더에는 원본에 없는 임의 변형 파일들(`logo.jpg`, `logo-mark.jpg`, `logo-512.png` 등)이 섞여 있습니다. 또한 Google Drive 원본 폴더에도 **웹에 필요한 변형본(가로형 워드마크, 정사각형 파비콘, OG 이미지 1200×630 등)이 없습니다**.
>
> 따라서 **`사단법인 도시안전디자인센터 BI.ai` 원본 파일**을 Illustrator로 열어 아래 5가지 변형본을 다시 제작해 주시기 바랍니다:
>
> 1. **가로형 워드마크 SVG 3종** (color / white / mono)
> 2. **정사각형 파비콘 마크** (엠블럼만, 16/32/48/192/512 + .ico)
> 3. **OG 이미지 1200×630 PNG**
> 4. **푸터·이메일용 보조 변형본**
> 5. **브랜드 사용 규정 1페이지 PDF** (최소 크기·여백·금지 변형)
>
> 상세 사양은 이 문서 섹션 2번을 참고해주세요.
>
> 작업 전에 **정식 영문명**을 먼저 확정해 주셔야 합니다:
> - 원본 로고 리본: `URBAN SAFETY DESIGN CENTER`
> - 기존 문서: `Urban Safety Design Forum`
> 둘 중 어느 쪽이 정식인지 결정이 필요합니다.
>
> 완료되면 `public/brand/` 폴더의 기존 파일들은 전량 교체됩니다.

---

## 5. 임시 대응 (디자이너 작업 전까지)

Illustrator 작업이 끝나기 전에 UX 리디자인을 계속 진행해야 한다면, 다음 임시 조치를 권장합니다:

1. **Header 44×44 박스만 제거** — 로고 비율을 자연스럽게 표시 (`h-10`, `w-auto`)
2. **logo-512.png → 실제 PNG로 재저장** — 또는 파일명을 `.jpg`로 수정
3. **favicon·apple-touch-icon** — 임시로 `logo.svg` 직접 사용 (비율 왜곡은 있지만 깨진 JPEG보다 나음)
4. **"대전경실련" 병기 텍스트 유지** — 공식 결정 전까지 현재 상태 유지

단, 이는 **임시**이며 Illustrator 작업이 완료되면 전량 교체해야 합니다.
