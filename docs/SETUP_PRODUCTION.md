# SETUP_PRODUCTION.md — 프로덕션 운영 설정 가이드

> 1단계(기반 정리) 작업 후 세열님이 직접 수행해야 하는 외부 설정 절차.
> 코드는 모두 준비되어 있고, 아래 키만 채우면 자동으로 전환된다.

## 0. 현재 구조 요약

| 구성 | 키 미설정 시 (현재) | 키 설정 시 |
|------|-------------------|-----------|
| 콘텐츠 저장(공지·일정·자료·문의) | 파일(`data/*.json`) — **운영에서는 쓰기 차단**(아래 참고) | Supabase DB — 영구 저장 |
| 로그인 레이트리밋 | 인메모리 — **서버리스에서 무력화** | Upstash Redis — 정상 작동 |
| 회원 가입/로그인 (Supabase Auth) | 무동작 (플레이스홀더) | 정상 작동 |

### 콘텐츠 저장소 모드와 쓰기 차단 (중요)

저장소는 `CONTENT_STORE` 환경 변수로 명시 지정할 수 있고(`supabase` | `file`),
미지정 시 Supabase 설정이 갖춰졌으면 `supabase`, 아니면 `file`이 선택된다.

**운영 환경(Vercel 또는 `NODE_ENV=production`)에서 `file` 저장소가 선택되면 쓰기가 차단된다.**
서버리스 파일시스템은 휘발성이라, 예전에는 관리자에게 "저장 완료"를 보여준 뒤
재배포·다른 인스턴스에서 데이터가 조용히 사라질 수 있었다.

| 상황 | 동작 |
|---|---|
| 공개 페이지 조회 | ✅ 정상 (설정 실수로 사이트 전체가 내려가지 않게 읽기는 막지 않음) |
| 관리자 저장/수정/삭제 | ❌ **503** + 빠진 설정 이름 안내 (값은 노출하지 않음) |
| 문의 접수 | ❌ 500 — 접수 성공으로 위장하지 않음 |

즉 **설정이 빠진 채로 "저장된 것처럼 보이는" 상태는 발생하지 않는다.**
관리자 화면에서 저장이 503으로 실패한다면 아래 1번 Supabase 설정을 확인할 것.

### 저장소 상태 확인 방법

| 방법 | 내용 |
|---|---|
| **관리자 화면 배너** | `/admin` 접속 시 문제가 있으면 상단에 배너가 뜬다. 정상이면 배너 없음 |
| **health API** | 관리자 로그인 후 `GET /api/admin/health/storage` |

health 응답의 `status` 의미:

| status | 뜻 | HTTP |
|---|---|---|
| `healthy` | Supabase 설정 완비, 저장 정상 | 200 |
| `degraded` | 로컬 파일 저장소로 동작 중(개발용, 영구 저장소 아님) | 200 |
| `unhealthy` | **운영인데 저장 불가** 또는 `CONTENT_STORE` 값 오류 | **503** |

응답에는 설정 **이름만** 담기고 URL·키 등 값은 포함되지 않는다.
`CONTENT_STORE`에 허용값(`supabase`/`file`) 외의 값을 넣으면 조용히 무시되지 않고
`unhealthy`로 표시되며 쓰기가 차단된다.

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

## 3-1. CI(GitHub Actions) 설정

`.github/workflows/ci.yml`이 push·PR마다 아래를 실행한다.

| Job | 내용 | secret 필요 |
|---|---|---|
| `verify` | lint → 단위 테스트 → 빌드 | ❌ |
| `e2e-public` | 공개·미인증 E2E (Chromium) | ❌ |
| `e2e-authenticated` | 로그인 성공/로그아웃 E2E | ✅ |

**secret 없이도 `verify`와 `e2e-public`은 완전히 돌아간다.** Supabase 설정이 없으면
앱이 mock 클라이언트로 대체되고, 저장소는 `CONTENT_STORE=file`로 고정된다.

### 인증 E2E용 secret (선택)

로그인 흐름까지 CI에서 검증하려면 **Settings → Secrets and variables → Actions**에 등록한다.

| Secret | 설명 |
|---|---|
| `E2E_TEST_EMAIL` | **테스트 전용 계정** 이메일 |
| `E2E_TEST_PASSWORD` | 위 계정 비밀번호 |
| `E2E_SUPABASE_URL` | `NEXT_PUBLIC_SUPABASE_URL`과 같은 값 |
| `E2E_SUPABASE_ANON_KEY` | `NEXT_PUBLIC_SUPABASE_ANON_KEY`와 같은 값 |

- ⚠️ **운영 관리자 계정을 쓰지 말 것.** 수강생 권한의 테스트 전용 계정을 따로 만든다.
- `SUPABASE_SERVICE_ROLE_KEY`는 CI에 넣지 않는다. 로그인에는 anon 키만 필요하다.
- secret이 하나라도 비어 있으면 **조용히 건너뛰지 않고 job이 실패**하며, 어떤 값이
  빠졌는지 로그에 표시된다.
- fork에서 온 PR은 secret에 접근할 수 없으므로 이 job 자체가 실행되지 않는다
  (공개 E2E는 그대로 실행된다).

### 운영 데이터 보호

CI의 E2E는 **항상 러너 안에서 띄운 로컬 서버**를 대상으로 한다
(`playwright.config.ts`의 `baseURL` 기본값이 로컬). 운영 사이트에 문의를 남기거나
테스트 데이터를 만들지 않는다. 외부 URL을 대상으로 하려면 `PLAYWRIGHT_BASE_URL`을
명시해야 하며, CI에는 설정하지 않는다.

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
