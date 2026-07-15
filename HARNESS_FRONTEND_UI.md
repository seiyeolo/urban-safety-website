## Harness Block
- Allowed tools/actions: `app/`, `components/` 폴더 내의 UI 컴포넌트 수정 (Tailwind CSS 활용). `npm run lint` 및 `npm run build` 실행.
- Forbidden actions: DB 스키마 변경, 외부 API(Stripe 등) 연동 등 백엔드 로직 수정 금지 (오직 UI 퍼블리싱만).
- Max attempts / stop rule: 린트(Lint) 에러 2회 이상 반복 시 즉각 중지 후 보고.
- Trace/evidence to collect: `git diff` 로그 및 UI 변경 전후 캡처(스크린샷).
- Deterministic verification: `npm run lint` 통과 여부.
- Safety reviewer: 소라 (디자인 및 접근성 검수)
- Knowledge destination: `status.md` (작업 궤적 기록)
