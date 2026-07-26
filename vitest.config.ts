import { defineConfig } from 'vitest/config'
import path from 'node:path'

/**
 * 단위 테스트 설정.
 * E2E(tests/e2e)는 Playwright가 담당하므로 vitest 수집 대상에서 제외한다.
 * 두 러너가 같은 파일을 잡으면 서로의 API가 없어 오탐이 난다.
 */
export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**', '.next/**'],
    environment: 'node',
    clearMocks: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
      // 빌드 타임 마커라 런타임 구현이 없다 — 테스트에서는 빈 모듈로 대체
      'server-only': path.resolve(import.meta.dirname, 'tests/unit/stubs/server-only.ts'),
    },
  },
})
