# 민호 작업지시 — Urban Safety Online Lecture MVP v0.1

**작성일**: 2026-07-15  
**대상 프로젝트**: `/Users/mac/Library/Mobile Documents/com~apple~CloudDocs/20260410_Urban/urban-safety-website`  
**배포 사이트**: `https://urban-safety-website.vercel.app/`  
**근거 보고서**: `docs/ONLINE_LECTURE_RESTRUCTURE_BENCHMARK_PLAN_20260715.md`

---

## 1. 승인 대상 작업명

`Urban Safety Online Lecture MVP v0.1 — mock 기반 온라인 강의실 재구성안/화면 설계`

## 2. 세열님 승인 범위

세열님이 다음 작업을 승인하셨다.

> Urban Safety Online Lecture MVP v0.1을 mock 기반으로 먼저 만든다. 실제 영상, 결제, 개인정보는 붙이지 않는다. 먼저 세열님이 “수강생이 어떻게 강의를 듣게 되는지” 화면으로 확인한다.

## 3. 허용 범위

- 내부 기획/설계/작업지시 작성
- mock 데이터 기반 화면 설계
- 로컬 프로젝트 내부 문서/브랜치 계획 작성
- Next.js 라우트/컴포넌트 설계안 작성
- 필요 시 mock UI 구현안 제안
- 대표 보고

## 4. 금지 범위

- 실제 수강생 개인정보 입력/업로드/저장 금지
- 실제 동영상 업로드/외부 영상 호스팅 연결 금지
- 결제 활성화/checkout 운영 연결 금지
- Supabase 운영 DB schema 변경/마이그레이션 금지
- 배포/Vercel production 반영 금지
- Git push 금지
- 외부 발송/공개 게시 금지
- 비용 발생/API 호출/OAuth/계정 연결 금지
- 자격증/수료/합격률 등 검증 안 된 성과 단정 금지
- Paperclip 공식 이슈/OpenCrab promote/apply 금지

## 5. 민호 역할

민호는 PM으로서 준호/지아/소라/하은/나연/진수/도윤에게 역할을 나누고, 산출물을 통합해 대표 보고한다.

| 담당 | 역할 |
|---|---|
| 민호 | 전체 PM, 범위/우선순위/최종 보고 |
| 준호 | Next.js 라우트/컴포넌트/데이터 구조 설계 |
| 지아 | 강의 카드, 내 강의실, 플레이어 UX 설계 |
| 소라 | 개인정보/자격/환불/저작권/수료기준 리스크 검수 |
| 하은 | 오프라인 수강생 안내문/FAQ/온보딩 문구 |
| 나연 | 커리큘럼/자료 구조/지식화 후보 정리 |
| 진수 | FastCampus/Hugging Face/GitHub Skills/edX 벤치마크 보강 |
| 도윤 | 기수/수강생 배정/운영 SOP 초안 |

## 6. 요청 산출물

민호는 아래 문서를 우선 생성/정리한다.

`docs/ONLINE_LECTURE_MVP_V01_WORKPLAN_20260715.md`

필수 섹션:

1. 결론: mock 기반 MVP부터 진행해야 하는 이유
2. 현재 사이트에서 재사용할 자산
3. 신규 화면 5개 설계
   - `/courses`
   - `/courses/voice-phishing-instructor`
   - `/dashboard/learning`
   - `/learn/voice-phishing-instructor/lesson/01`
   - `/admin/enrollments` mock
4. mock 데이터 구조
5. 화면별 수강생 사용자 흐름
6. 오프라인 수강생 → 온라인 수강생 전환 흐름
7. 소라 안전 게이트
8. 구현 전 세열님 결정 필요 4가지
9. 준호에게 넘길 Claude Code/Codex 작업 프롬프트 초안
10. 대표 보고 5줄 요약

## 7. 완료 기준

- 위 workplan 문서가 생성되어 있어야 한다.
- 실제 영상/결제/개인정보/운영 DB/배포/외부 발송이 없어야 한다.
- 벤치마크 보고서의 핵심이 반영되어야 한다.
- 세열님이 다음 단계로 “mock 화면 구현 승인” 여부를 판단할 수 있어야 한다.

## 8. 대표 보고 양식

```text
[Hermes Telegram 요약 전달 요청]
결론:
완료/진행중/막힘:
산출물 위치:
소라 검수 상태:
세열님 결정 필요:
```
