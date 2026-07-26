import { defineConfig, devices } from '@playwright/test';

/**
 * E2E 설정.
 *
 * ⚠️ baseURL 기본값은 반드시 로컬이어야 한다.
 * 예전에는 운영 도메인이 기본값이라, 로컬에서 테스트를 돌리면 실제 사이트에
 * 문의가 접수되는 등 운영 데이터를 오염시킬 수 있었다.
 * 운영/프리뷰를 대상으로 돌리려면 PLAYWRIGHT_BASE_URL을 명시할 것.
 *
 *   로컬:    npm run test:e2e
 *   특정 URL: PLAYWRIGHT_BASE_URL=https://... npm run test:e2e
 *
 * 브라우저 설치(최초 1회):
 *   npx playwright install chromium
 *   npx playwright install --with-deps chromium   # Linux CI
 */

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const isExternalTarget = !baseURL.includes('localhost');

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // 아티팩트(스크린샷·비디오·trace)와 리포트 출력 경로를 분리한다.
  // 같은 디렉터리를 쓰면 리포터가 아티팩트를 덮어쓰거나 지운다.
  outputDir: 'test-results/artifacts',
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // 외부 URL을 대상으로 할 때는 로컬 서버를 띄우지 않는다.
  ...(isExternalTarget
    ? {}
    : {
        webServer: {
          // ⚠️ dev 서버로 돌리면 안 된다.
          // Next.js dev 모드는 컴포넌트를 이중 마운트해서 같은 id를 가진 요소가
          // DOM에 두 번 나타난다(예: 로그인 폼). 그러면 strict mode locator가
          // 실패해 "실제 버그"처럼 보이는 오탐이 생긴다.
          // 프로덕션 빌드에서는 동일 테스트가 전부 통과한다 — 운영과 같은 조건으로 검증한다.
          command: 'npm run build && npm start',
          url: 'http://localhost:3000',
          reuseExistingServer: !process.env.CI,
          timeout: 300_000,
        },
      }),
});
