-- ============================================================
-- 0001_content_store.sql
-- 파일 기반 CMS → Supabase 이전 (notices/schedules/downloads/contacts)
--
-- 적용 방법: Supabase 대시보드 → SQL Editor → 전체 붙여넣기 → Run
-- 컬럼명은 코드의 camelCase 필드와 1:1 매핑 (따옴표 식별자 사용)
-- ============================================================

-- 1) 공지사항
create table if not exists public.notices (
  id          text primary key default gen_random_uuid()::text,
  category    text not null default '공지',
  title       text not null,
  date        date not null,
  "isNew"     boolean not null default false,
  created_at  timestamptz not null default now()
);

-- 2) 교육 일정
create table if not exists public.schedules (
  id          text primary key default gen_random_uuid()::text,
  month       text not null,            -- 예: '2026년 7월'
  date        text not null,            -- 예: '07.10 (금)' — 표시용 문자열
  type        text not null,            -- '온라인' | '오프라인'
  title       text not null,
  seats       text not null default '',
  href        text not null default '',
  created_at  timestamptz not null default now()
);

-- 3) 자료실
create table if not exists public.downloads (
  id          text primary key default gen_random_uuid()::text,
  category    text not null default '기타',
  title       text not null,
  type        text not null default 'PDF',
  size        text not null default '',
  date        date not null,
  href        text not null default '#',
  created_at  timestamptz not null default now()
);

-- 4) 문의 내역 (PII — 외부 접근 전면 차단)
create table if not exists public.contacts (
  id               text primary key default gen_random_uuid()::text,
  name             text not null,
  phone            text not null default '',
  email            text not null default '',
  "inquiryType"    text not null default '',
  title            text not null default '',
  message          text not null,
  "privacyConsent" boolean not null default false,
  "submittedAt"    timestamptz not null default now(),
  status           text not null default 'new' check (status in ('new', 'in_progress', 'done')),
  created_at       timestamptz not null default now()
);

-- ============================================================
-- RLS (Row Level Security)
-- 쓰기는 모두 서버의 service role로만 수행 (RLS 우회) — anon 쓰기 정책 없음
-- ============================================================

alter table public.notices   enable row level security;
alter table public.schedules enable row level security;
alter table public.downloads enable row level security;
alter table public.contacts  enable row level security;

-- 공개 콘텐츠: 누구나 읽기 가능
create policy "public read notices"   on public.notices   for select using (true);
create policy "public read schedules" on public.schedules for select using (true);
create policy "public read downloads" on public.downloads for select using (true);

-- contacts(PII): 정책 없음 = anon/authenticated 전면 차단, service role만 접근

-- 정렬용 인덱스
create index if not exists notices_date_idx    on public.notices  ("date" desc);
create index if not exists downloads_date_idx  on public.downloads ("date" desc);
create index if not exists contacts_submitted_idx on public.contacts ("submittedAt" desc);
