/**
 * `server-only`는 클라이언트 번들에 서버 코드가 섞이는 것을 빌드 타임에 막는 마커 패키지로,
 * 런타임 동작이 없다. vitest(Node)에서는 해석되지 않으므로 빈 모듈로 대체한다.
 * 실제 빌드에는 영향이 없다 — vitest.config.ts의 alias에서만 사용된다.
 */
export {}
