# SETUP_PRODUCTION.md — 프로덕션 운영 설정 가이드

> 1단계(기반 정리) 작업 후 세열님이 직접 수행해야 하는 외부 설정 절차.
> 코드는 모두 준비되어 있고, 아래 키만 채우면 자동으로 전환된다.

## 0. 현재 구조 요약

| 구성 | 키 미설정 시 (현재) | 키 설정 시 |
|------|-------------------|-----------|
| 콘텐츠 저장(공지·일정·자료·문의) | 파일(`data/*.json`) — **서버리스 배포에서 저장 안 됨** | Supabase DB — 영구 저장 |
| 로그인 레이트리밋 | 인메모리 — **서버리스에서 무력화** | Upstash Redis — 정상 작동 |
| 회원 가입/로그인 (Supabase Auth) | 무동작 (플레이스홀더) | 정상 작동 |

## 1. Supabase 설정 (필수 — 약 10분)

1. https://supabase.com → 프로젝트 생성 (무료 티어, 리전: Northeast Asia(Seoul) 권장)
2. **SQL Editor** → `supabase/migrations/0001_content_store.sql` 파일 내용 전체 붙여넣기 → **Run**
   - notices/schedules/downloads/contacts 테이블 + RLS 정책 생성됨
3. **Settings → API**에서 3개 값 복사:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role 키 → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ 서버 전용, 절대 공개 금지
4. `.env.local`과 배포 환경변수(Vercel 등) 양쪽에 입력
5. 확인: 관리자 페이지에서 공지 1건 등록 → Supabase Table Editor에 행이 생기면 성공

## 2. Upstash Redis 설정 (필수 — 약 5분)

1. https://console.upstash.com → 무료 가입 → **Create Redis Database** (리전: ap-northeast)
2. REST API 탭에서 2개 값 복사:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. `.env.local`과 배포 환경변수에 입력 (현재 `.env.local`에 주석 처리된 줄 활성화)
4. 효과: 관리자 로그인 무차별 대입 방어(15분 5회)가 서버리스에서도 작동

## 3. 배포 환경변수 체크리스트 (Vercel 기준)

Settings → Environment Variables에 아래 전부 등록:

| 변수 | 비고 |
|------|------|
| `ADMIN_PASSWORD` | bcrypt 해시 — Vercel에는 `\` 이스케이프 **없이** `$2b$...` 원형 입력 |
| `ADMIN_SECRET` | 32바이트 hex 난수 (로컬과 동일값 또는 재생성) |
| `NEXT_PUBLIC_SUPABASE_URL` | 1번에서 복사 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 1번에서 복사 |
| `SUPABASE_SERVICE_ROLE_KEY` | 1번에서 복사 — **Sensitive 체크** |
| `UPSTASH_REDIS_REST_URL` | 2번에서 복사 |
| `UPSTASH_REDIS_REST_TOKEN` | 2번에서 복사 — **Sensitive 체크** |
| `NEXT_PUBLIC_SITE_URL` | 실제 도메인 (예: `https://example.org`) — OG/메타데이터용 |

## 4. 시크릿 위생 권고

- 이 프로젝트는 현재 **iCloud 동기화 폴더** 안에 있다. `.env.local`(시크릿 포함)이
  클라우드에 동기화되므로, 가능하면 프로젝트를 로컬 경로(`~/dev/` 등)로 이동하거나
  최소한 `.env.local`을 다른 곳에 보관하고 심볼릭 링크로 연결할 것.
- 관리자 평문 비밀번호는 비밀번호 관리자(1Password 등)에만 보관. 분실 시
  `node -e "require('bcrypt').hash('새비밀번호', 12).then(console.log)"`로 재생성.

## 5. 원본 자료 (콘텐츠 완성용 — 위치 확인 필요)

아래 원본이 현재 작업 폴더에 없다. 위치를 알려주면 반영 작업 진행 가능:

- `도시안전포럼 정관006.pdf` (스캔본 — OCR 대상)
- `재단법인 출범필요서류(스켄본).pdf`
- `설립 취지와 비전 - USDF.pdf` / `연락처 및 파트너십 - USDF.pdf`
- `사단법인 도시안전디자인센터 BI.ai` (로고 — SVG/PNG/파비콘 추출용)
