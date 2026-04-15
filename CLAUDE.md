# CLAUDE.md — urban-safety-website 하네스

@AGENTS.md

## 프로젝트 개요

**클라이언트**: 대전경실련 도시안전디자인센터
**성격**: 경실련 산하 법인체 — 공공기관도 민간기업도 아닌 시민공익단체
**핵심 사업**: 교육 + 민간자격 인증 + 사회공헌활동
**신뢰 기반**: 35년 경실련 운동의 공신력
**연락처**: 042-254-8060
**기술스택**: Next.js 16.2.3 + React 19 + Tailwind CSS v4 + TypeScript

---

## 3-AI 워크플로우 (Antigravity 기준)

| 역할 | 도구 | 담당 |
|------|------|------|
| 기획 | Codex CLI (터미널) | 기능 설계·구조 결정 |
| 코딩 | Claude Code (가운데) | 구현·수정 |
| 디자인 | Figma + Stitch + Pencil MCP | CI/BI·디자인 시스템·UI |

## 디자인 툴 파이프라인

```
Google Stitch (무료)     →    Figma (유료)         →    Claude Code
0→1 아이디어·시안 생성       디자인 시스템 정제            MCP로 코드 구현
텍스트 프롬프트 → UI          컴포넌트·토큰·변수            Next.js 컴포넌트
DESIGN.md 내보내기           브랜드 일관성 완성            자동 생성
```

## Figma MCP → Claude Code 연동

Claude Code 채팅창에서:
```
@figma [컴포넌트명]을 읽고 Next.js + Tailwind로 구현해줘
```

---

## 디자인 작업 로드맵 (우선순위 순)

### Phase 1 — CI/BI 기반 작업 (현재 진행 중)
```
1-1. YouTube 리서치 → NotebookLM 학습
     - 한국 시민단체 브랜딩 사례
     - 공익기관 CI/BI 디자인 트렌드
     - 비영리 웹사이트 디자인 2026

1-2. CI (Corporate Identity) 작업
     - 로고 사용 규정
     - 브랜드 아이덴티티 철학 문서화

1-3. BI (Brand Identity) 작업
     - 브랜드 보이스 & 톤
     - 브랜드 스토리

1-4. 컬러 시스템 확정
     - Primary / Secondary / Accent / Neutral
     - 각 색상 의미와 사용 규칙
```

### Phase 2 — 디자인 시스템 구축
```
2-1. Figma Color Variables 설정
2-2. Typography 스타일 (Noto Sans KR)
2-3. Component Library 구축
2-4. DESIGN.md 내보내기
```

### Phase 3 — 웹사이트 적용
```
3-1. Figma MCP → Claude Code 연동
3-2. globals.css 전면 교체
3-3. 컴포넌트 순차 적용
3-4. Vercel 재배포
```

---

## 디렉토리 구조

```
app/
├── page.tsx              # 메인 홈
├── about/                # 센터소개
├── education/            # 교육과정
├── certificates/         # 민간자격증
├── notice/               # 공지사항
├── contact/              # 문의
├── admin/                # 관리자
└── api/auth/             # 인증 API

components/
├── Header.tsx
├── Footer.tsx
└── LayoutWrapper.tsx
```

---

## 디자인 시스템 (확정 예정)

### 브랜드 포지셔닝
> "가족을 믿고 맡길 수 있는 동네 안전 전문가"
- 딱딱한 관공서 ❌
- 화려한 상업 플랫폼 ❌
- 따뜻하고 신뢰감 있는 시민단체 ✅

### 컬러 시스템 (Pencil 리서치 기반 제안)
| 역할 | 색상 | 코드 | 의미 |
|------|------|------|------|
| Primary | 네이비 | #1a3a5c | 신뢰·전문성 |
| Accent | 안전 그린 | #2e7d32 | 안전·공익 |
| Warning | 앰버 | #e65100 | 경고·CTA |
| Background | 크림 | #fafaf8 | 따뜻한 친근함 |
| Text | 소프트 다크 | #2c3e50 | 가독성 |

### 타이포그래피
- **폰트**: Noto Sans KR 전용
- **본문**: 최소 18px (40~60대 배려)
- **행간**: 1.7 (여유있게)

---

## NotebookLM 리서치 가이드

### 검색할 YouTube 키워드
```
1. "한국 시민단체 브랜딩" / "NGO 브랜드 디자인"
2. "비영리 웹사이트 디자인 2025 2026"
3. "공익기관 CI BI 사례"
4. "Figma design system tutorial 2026"
5. "brand identity nonprofit organization"
```

### NotebookLM 활용법
1. YouTube URL 붙여넣기 (소스 추가)
2. "도시안전디자인센터 CI/BI에 적용할 수 있는 인사이트 정리해줘" 질문
3. 결과를 DESIGN_BOOK.md에 저장

---

## 코딩 규칙

- TypeScript strict 모드 유지
- Server Component 우선
- lucide-react 아이콘 사용
- Tailwind v4 / @apply 최소화
- `any` 타입 사용 금지

## Git 커밋 컨벤션

```
feat:     새 기능
fix:      버그 수정
design:   UI/UX 변경
ci:       CI/BI 적용
refactor: 코드 개선
content:  콘텐츠 수정
chore:    설정·패키지
```
