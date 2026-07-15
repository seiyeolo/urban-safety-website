# D-Day 오픈 체크리스트 — 온라인 강의 (2026-07-16 아침)

**작성**: 2026-07-15 밤 | **목표**: 내일 아침 수강생이 로그인 후 동영상 강의 수강

---

## 1. 오늘 밤 세열님이 직접 할 일 (순서대로)

### ① YouTube 영상 업로드 (약 20~30분)

1. YouTube Studio (studio.youtube.com) → 만들기 → 동영상 업로드
2. `vedio_lec/` 폴더의 영상 3개를 업로드
3. 공개 설정: 반드시 **일부공개(Unlisted)** 선택 (공개 ❌, 비공개 ❌)
4. 세부 설정 권장: 아동용 아님 / 댓글 사용 안 함 / 퍼가기 허용 **켜기** (임베드에 필수)
5. 각 영상 주소에서 ID 복사
   - 예: `https://youtu.be/AbCdEf12345` → ID는 `AbCdEf12345`

### ② 영상 ID 붙여넣기 (2분)

`lib/lessonVideos.ts` 파일을 열고 1~3강에 ID를 붙여넣기:

```ts
'lesson-01': '여기에_1강_ID',
'lesson-02': '여기에_2강_ID',
'lesson-03': '여기에_3강_ID',
```

ID가 빈 차시(4~6강)는 자동으로 "영상 준비 중"으로 표시됩니다.

### ③ Supabase 수강생 계정 발급 (10분)

이메일 자동발송은 무료 티어에서 시간당 2~4건 제한이 있으므로 **대시보드에서 직접 생성**이 안전합니다.

1. supabase.com → 프로젝트 → **Authentication → Users → Add user → Create new user**
2. 수강생별 이메일 + 임시 비밀번호 입력
3. **"Auto Confirm User" 반드시 체크** (이메일 인증 생략)
4. 발급한 이메일/임시 비밀번호를 명단으로 정리 (개인정보 — 카톡 단체방에 일괄 공유 금지, 개별 전달)

> 수강생이 많으면: 오늘 밤은 공용 계정 1~2개(예: student1@...)로 시작하고, 개별 계정은 이후 발급하는 것도 방법입니다.

### ④ Vercel 환경변수 확인 (5분)

Vercel → 프로젝트 → Settings → Environment Variables에 아래 2개가 있는지 확인:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

없으면 `.env.local`의 값을 그대로 등록 (없이 배포하면 로그인이 "Supabase가 설정되지 않았습니다" 오류를 냅니다).

### ⑤ 커밋 & 배포 (5분)

```bash
cd urban-safety-website
git add -A
git commit -m "feat: 온라인 강의실 오픈 — 실영상 연결, 로그인 가드, 진도 저장"
git push origin feature/phase1-foundation
```

- Vercel이 main 브랜치만 자동 배포한다면: GitHub에서 PR 생성 → main 머지, 또는 `git checkout main && git merge feature/phase1-foundation && git push`
- 배포 완료 후 반드시 **시크릿 창에서 직접 테스트** (아래 6번)

### ⑥ 최종 점검 (배포 후 10분)

- [ ] `/dashboard/learning` 접속 → 로그인 페이지로 이동되는가
- [ ] 발급 계정으로 로그인 → 내 강의실로 복귀되는가
- [ ] "첫 강의 시작하기" → 1강 영상이 재생되는가
- [ ] 휴대폰(모바일)에서 영상 재생 확인 — 수강생 대부분이 휴대폰 사용
- [ ] "이 차시 완료하고 다음 강의" → 2강 이동 + 진도율 반영되는가
- [ ] 2강, 3강 영상 재생 확인
- [ ] 로그아웃 → 다시 로그인 확인

---

## 2. 수강생 안내문 (문자/카톡용 — 복사해서 사용)

```
[도시안전디자인센터] 온라인 강의 수강 안내

안녕하세요. 보이스피싱 예방지도사 과정 온라인 강의 수강 안내드립니다.

1. 접속: https://urban-safety-website.vercel.app/dashboard/learning
2. 로그인: 개별 안내드린 이메일과 비밀번호 입력
3. [첫 강의 시작하기] 버튼을 누르면 바로 수강할 수 있습니다.

- 휴대폰, 태블릿, PC 모두 수강 가능합니다.
- 강의를 다 보신 후 [이 차시 완료] 버튼을 눌러주세요.
- 문의: 042-254-8060
```

---

## 3. 오늘 반영된 변경 사항 (개발 기록)

| 구분 | 파일 | 내용 |
|---|---|---|
| 신규 | `lib/lessonVideos.ts` | 차시별 YouTube ID 설정 (ID만 붙여넣으면 연결) |
| 신규 | `lib/learning/progress.ts` | 진도 저장 스토어 (localStorage, Phase 2에서 Supabase 이전) |
| 신규 | `lib/auth/RequireAuth.tsx` | 로그인 가드 — 미로그인 시 로그인 페이지로 |
| 신규 | `app/learn/layout.tsx` | /learn 구간 AuthProvider 마운트 |
| 신규 | `app/learn/.../lesson/[id]/` | 동적 차시 라우트 (01~06) + 실제 플레이어 |
| 수정 | `app/auth/login/page.tsx` | 로그인 후 원래 페이지 복귀 (?redirect=) |
| 재작성 | `app/dashboard/learning/` | 내 강의실 — 실진도 연동, 이어보기, 로그아웃 |
| 이동 | `_archive_20260715/lesson-01-hardcoded/` | 기존 하드코딩 1강 페이지 보관 |

**검증**: `npm run lint` 에러 0건 / `npm run build` 통과 (lesson 01~06 SSG 생성 확인)

**안전 게이트 준수**: 운영 DB 스키마 변경 없음, 결제 비활성, 개인정보 코드 내 미포함, 민간자격 고지 유지. 영상 업로드·git push·배포는 세열님 직접 수행(= 승인) 항목.

---

## 4. 알려진 한계 (내일 아침 기준 — 정직하게)

1. **진도는 기기(브라우저)별 저장** — 수강생이 휴대폰→PC로 바꾸면 진도가 이어지지 않음 (차시는 직접 선택 가능). Phase 2에서 Supabase 진도 테이블로 해결.
2. **수강권한 구분 없음** — 로그인한 사람은 모두 같은 강의를 봄. 현재는 계정 발급 자체가 권한 역할.
3. **YouTube 일부공개** — 링크가 유출되면 로그인 없이도 YouTube에서 시청 가능. 단기 운영상 허용 범위, Phase 2에서 호스팅 재검토.
4. **강의자료 다운로드는 "준비 중"** — 실제 PDF 파일이 아직 없음.
5. 4~6강은 영상이 없어 "준비 중" 표시.

---

## 5. 다음 단계 (Track 2 — 내일 이후)

1. **이원화 실행**: 기관 홈페이지 심플화 + 온라인 강의실 배너 (docs/DUAL_SITE_STRATEGY_DECISION 참조)
2. **디자인 재설계**: 브랜드 팔레트 단일화(Navy+Green 확정본 기준) → DESIGN.md 토큰 → 컴포넌트 순 적용, HARNESS_FRONTEND_UI.md 규칙(스크린샷 증적, lint/build 검증) 준수
3. **데이터 이전**: courses/lessons/enrollments/lesson_progress Supabase 테이블 설계 → mock 제거
4. **콘텐츠 타입 통합**: Lesson에 `type: 'video' | 'html' | 'quiz'` 도입 — 동영상·HTML 자료·평가를 한 커리큘럼 구조로
5. UX 진단 C1~C5 (지도, 더미 공지, 2024 일정, 센터장 프로필, 신청 플로우) 순차 해소
