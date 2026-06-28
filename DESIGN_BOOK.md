# 대전경실련 도시안전디자인센터 디자인 시스템 구축 가이드

## 프로젝트 개요

**기관**: 대전경실련 도시안전디자인센터  
**성격**: 시민공익단체 (경실련 산하 법인체)  
**타겟**: 40~60대 한국 시민, 개인 자격증 취득 희망자  
**핵심사업**: 교육 + 민간자격 인증 + 사회공헌활동  
**포지셔닝**: "가족을 믿고 맡길 수 있는 동네 안전 전문가"  

---

## 1단계: 리서치 기반 브랜드 전략

### 한국 시민단체 브랜딩 분석 결과

#### 경쟁사 패턴 (피해야 할 것)
- **미국식 빨강/흰/파랑 조합** → 한국 정서 부적합
- **청년 타겟 디자인** → 40~60대에게 거리감
- **기업 교육 스타일** → 개인 안전교육엔 너무 딱딱
- **화려한 상업 플랫폼 느낌** → 시민단체 신뢰성 저해

#### 성공 사례에서 추출한 핵심 요소
**환경운동연합 CI 분석**:
- 자연 친화적 그린 계열 주색상
- 단순하면서도 상징적인 로고
- 시민 친화적 타이포그래피

**대한산업안전협회 벤치마킹**:
- 안전을 상징하는 블루/그린 조합
- 전문성과 신뢰감을 주는 심볼
- 교육기관답게 명확한 정보 전달

#### 차별화 전략
- **네이비 + 그린 + 앰버** 조합으로 차별화
- 정부기관도 상업플랫폼도 아닌 **"따뜻한 전문가"** 톤
- 여백 넉넉, 읽기 쉬운 중장년 친화 타이포
- 신뢰 뱃지/인증 UI 강조

---

## 2단계: 7단계 AI 기반 디자인 시스템 방법론

### 단계별 구현 가이드

#### 1단계: 컬러 추출 (Coolors.co)
**목표**: 기존 사이트에서 색상 분석 + 개선안 도출

**현재 컬러 시스템**:
- Primary: `#06153a` (너무 어두운 네이비)
- Accent: `#e85d04` (공격적 오렌지)

**개선된 컬러 시스템**:
```css
/* Primary Color */
--navy-trust: #1a3a5c;        /* 신뢰·전문성 */

/* Accent Colors */
--safety-green: #2e7d32;      /* 안전·공익 */
--warm-amber: #e65100;        /* 경고·CTA */

/* Background */
--cream-warm: #fafaf8;        /* 따뜻한 친근함 */

/* Text */
--text-soft: #2c3e50;         /* 부드러운 다크 */
```

**컬러 의미 체계**:
- **네이비**: 경실련 35년 공신력, 전문성
- **그린**: 안전, 공익, 시민사회 가치
- **앰버**: 보이스피싱 등 경고, 행동 촉구

#### 2단계: 레퍼런스 수집 (Pinterest/Canva)
**검색 키워드**:
- "Korean NGO website design"
- "Educational organization branding"
- "Safety training website UI"
- "Civic organization identity"
- "Middle-aged friendly web design"

**수집 대상**:
- 교육기관 홈페이지 레이아웃
- 인증서/뱃지 디자인
- 안전 관련 아이콘셋
- 시민단체 브랜딩 사례

#### 3단계: Gemini 비주얼 구현
**Gemini 프롬프트 예시**:

```
Create a visual identity system for "Daejeon PSPD Urban Safety Design Center", 
a Korean civic organization focused on crime prevention education for 40-60 year olds.

Brand characteristics:
- Trustworthy neighborhood safety expert
- Warm professionalism (not corporate, not commercial)
- 35 years of PSPD credibility
- Educational certification focus

Color palette:
- Primary: Navy #1a3a5c (trust, expertise)
- Accent: Green #2e7d32 (safety, public interest)  
- Warning: Amber #e65100 (alert, CTA)
- Background: Warm cream #fafaf8

Design elements needed:
1. Logo variations (horizontal, vertical, minimal)
2. Typography system (Noto Sans KR based)
3. Icon set (safety, education, certification themes)
4. UI component samples (cards, buttons, badges)
5. Layout templates (hero, course cards, certificate display)

Style: Modern Korean civic design, accessible to middle-aged users, 
clean but warm, professional but approachable.
```

#### 4단계: Claude MD 문서화
**생성할 문서**:
- `CI_GUIDELINES.md`: 로고 사용 규정
- `BRAND_VOICE.md`: 브랜드 보이스 & 톤
- `COLOR_SYSTEM.md`: 색상 체계 및 사용법
- `TYPOGRAPHY.md`: 폰트 시스템
- `COMPONENT_LIBRARY.md`: UI 컴포넌트 가이드

#### 5단계: MECE 검증
**검증 기준**:
- **Mutually Exclusive**: 각 컴포넌트 역할이 명확히 구분되는가?
- **Collectively Exhaustive**: 모든 사용 사례를 커버하는가?

**체크리스트**:
- [ ] 모든 페이지 유형 커버 (홈, 교육과정, 자격증, 공지사항, 문의)
- [ ] 반응형 디자인 (모바일 60% 고려)
- [ ] 접근성 (40~60대 사용성)
- [ ] 브랜드 일관성 (모든 터치포인트)

#### 6단계: Claude Skill 생성
**스킬 기능**:
- 다크모드 자동 생성
- PDF 디자인 가이드 출력
- 컴포넌트 ZIP 패키지 생성
- Figma 연동 준비

#### 7단계: Canva Magic Layer 최종 편집
**최종 산출물**:
- 브랜드 아이덴티티 패키지
- 웹사이트 디자인 시스템
- 인쇄물 템플릿 (수료증, 포스터)
- SNS 템플릿

---

## 3단계: 구체적 구현 계획

### Phase 1: CI/BI 기반 작업 (진행 중)
```
✅ 1-1. YouTube 리서치 → NotebookLM 학습 완료
     - 한국 시민단체 브랜딩 사례 분석
     - AI 기반 디자인 시스템 방법론 습득

🔄 1-2. CI (Corporate Identity) 작업
     - 로고 디자인 (Google Stitch 활용)
     - 로고 사용 규정 문서화
     - 브랜드 아이덴티티 철학

⏳ 1-3. BI (Brand Identity) 작업  
     - 브랜드 보이스 & 톤 정의
     - 브랜드 스토리 구체화

⏳ 1-4. 컬러 시스템 확정
     - 최종 색상표 결정
     - 사용 규칙 및 가이드라인
```

### Phase 2: 디자인 시스템 구축
```
2-1. Figma Color Variables 설정
     → Primary/Secondary/Accent/Neutral 체계

2-2. Typography 스타일 (Noto Sans KR)
     → 본문 18px+, 행간 1.7 (중장년 배려)

2-3. Component Library 구축
     → 카드/버튼/폼/뱃지/네비게이션

2-4. DESIGN.md 내보내기
     → 개발자 친화적 가이드
```

### Phase 3: 웹사이트 적용
```
3-1. Figma MCP → Claude Code 연동
3-2. globals.css 전면 교체
3-3. 컴포넌트 순차 적용
3-4. Vercel 재배포
```

---

## 4단계: 트러블슈팅 가이드

### AI 시스템 구축 시 자주 발생하는 문제

#### 컬러 일관성 문제
**문제**: AI가 매번 다른 색상 제안
**해결**: Coolors에서 추출한 HEX 코드를 모든 프롬프트에 명시

#### 타겟 연령대 미스매치
**문제**: 20-30대 스타일로 생성됨
**해결**: "40-60세 한국인 친화적" 명시적 언급

#### 상업적 느낌 과도
**문제**: 기업 브랜딩처럼 화려함
**해결**: "시민공익단체", "따뜻한 신뢰감" 키워드 강조

#### 한국적 정서 부재
**문제**: 서구적 디자인 스타일
**해결**: "한국 시민단체 전통", "경실련 35년 역사" 맥락 제공

---

## 5단계: 다음 액션 플랜

### 즉시 실행 (이번 세션)
1. **Google Stitch 로고 생성**
   - 프롬프트: "대전경실련 도시안전디자인센터 로고"
   - 컬러: 네이비 + 그린 조합
   - 스타일: 심플, 전문적, 한국적

2. **핵심 컴포넌트 디자인**
   - 히어로 섹션 개선안
   - 교육과정 카드 리디자인
   - 자격증 뱃지 시스템

### 단기 실행 (1-2주)
3. **Figma 디자인 시스템 구축**
   - Color Variables 세팅
   - 컴포넌트 라이브러리 생성
   - 프로토타입 제작

4. **개발자 가이드 생성**
   - Tailwind CSS v4 호환
   - Next.js 16.2.3 컴포넌트
   - 반응형 그리드 시스템

### 중장기 실행 (1개월)
5. **웹사이트 전면 리뉴얼**
   - 현재 사이트 디자인 적용
   - 사용자 테스트 & 피드백
   - 최종 개선 및 배포

---

## 6단계: 성공 지표

### 브랜드 인지도
- 시민단체다운 신뢰감 증대
- 40-60대 타겟층 친근감 향상
- 경실련 브랜드 연관성 강화

### 사용성 개선  
- 모바일 접근성 향상 (60% 트래픽)
- 교육 신청 전환율 증가
- 자격증 문의 증가

### 기술적 완성도
- Figma → Next.js 자동화 파이프라인
- 디자인 토큰 시스템 완성
- 유지보수 효율성 극대화

---

## 부록: 리소스 및 도구

### 필수 도구
- **Google Stitch**: 로고 생성
- **Coolors.co**: 컬러 팔레트 관리  
- **Figma**: 디자인 시스템 구축
- **NotebookLM**: 지속적 리서치
- **Claude Code**: 자동 구현

### 참고 자료
- 환경운동연합 CI 가이드라인
- 대한산업안전협회 브랜딩 사례
- 한국 시민단체 웹사이트 모범사례
- CPTED 디자인 원칙

### 협업 워크플로우
```
디자인 → Figma → DESIGN.md → Claude Code → Next.js → Vercel
   ↓
Pencil MCP → 자동 컴포넌트 생성 → 코드 리뷰 → 배포
```

이제 실제 구현을 시작할 준비가 완료되었습니다. 다음은 Google Stitch에서 로고 디자인부터 시작하겠습니다.