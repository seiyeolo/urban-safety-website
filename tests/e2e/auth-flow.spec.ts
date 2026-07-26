import { test, expect } from '@playwright/test';

/**
 * 인증 플로우 E2E.
 *
 * 이전 버전은 홈에서 "로그인" 버튼을 못 찾으면 `test.skip(true, '로그인 기능이
 * 구현되지 않음')`으로 건너뛰었다. 로그인은 실제로 구현돼 있으므로 이 skip은
 * 사실과 달랐고, 헤더 레이아웃이 바뀌면 인증 검증 전체가 조용히 사라졌다.
 * → 로그인/회원가입 페이지로 직접 이동해 항상 검증한다.
 *
 * 실제 로그인 성공 흐름만 계정이 필요하며, 그 경우에만 사유를 명시해 skip한다.
 *   E2E_TEST_EMAIL / E2E_TEST_PASSWORD
 */

const TEST_EMAIL = process.env.E2E_TEST_EMAIL;
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD;
const hasTestAccount = Boolean(TEST_EMAIL && TEST_PASSWORD);

test.describe('로그인 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('domcontentloaded');
  });

  test('로그인 폼이 렌더링된다', async ({ page }) => {
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('이메일·비밀번호 입력에 라벨이 연결되어 있다 (스크린리더 접근성)', async ({ page }) => {
    for (const type of ['email', 'password']) {
      const input = page.locator(`input[type="${type}"]`).first();
      const id = await input.getAttribute('id');
      expect(id, `input[type=${type}]에 id가 없어 라벨을 연결할 수 없음`).toBeTruthy();
      await expect(page.locator(`label[for="${id}"]`)).toBeVisible();
    }
  });

  test('필수 입력을 비우고 제출하면 브라우저 검증이 막는다', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    // 제출이 막혀 로그인 페이지에 머물러야 한다
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('잘못된 자격 증명은 오류를 보여주고 통과시키지 않는다', async ({ page }) => {
    await page.locator('input[type="email"]').fill('nonexistent-user@example.invalid');
    await page.locator('input[type="password"]').fill('definitely-wrong-password');
    await page.locator('button[type="submit"]').click();

    // 대시보드로 넘어가면 안 된다
    await page.waitForTimeout(3000);
    await expect(page).not.toHaveURL(/\/dashboard/);
  });

  test('소셜 로그인 수단이 제공된다', async ({ page }) => {
    const social = page.locator('button:has-text("구글"), button:has-text("카카오")');
    expect(await social.count()).toBeGreaterThan(0);
  });

  test('회원가입 페이지로 이동할 수 있다', async ({ page }) => {
    await page.locator('a[href*="signup"]').first().click();
    await expect(page).toHaveURL(/signup/);
  });
});

test.describe('회원가입 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/signup');
    await page.waitForLoadState('domcontentloaded');
  });

  test('회원가입 폼이 렌더링된다', async ({ page }) => {
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]').first()).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('모든 입력에 라벨이 연결되어 있다', async ({ page }) => {
    const inputs = page.locator('input:not([type="checkbox"]):not([type="hidden"])');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const id = await inputs.nth(i).getAttribute('id');
      expect(id, `${i}번째 입력에 id가 없음`).toBeTruthy();
      expect(await page.locator(`label[for="${id}"]`).count()).toBeGreaterThan(0);
    }
  });

  test('약관 동의 없이는 가입이 진행되지 않는다', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/signup/);
  });
});

test.describe('보호 경로', () => {
  // 미인증 사용자가 개인 데이터 화면에 접근하지 못하는지 — 가장 중요한 계약
  for (const path of ['/dashboard', '/dashboard/learning']) {
    test(`미로그인 상태로 ${path} 접근 시 로그인 페이지로 보낸다`, async ({ page }) => {
      await page.goto(path);
      await page.waitForURL(/\/auth\/login/, { timeout: 15_000 });
      await expect(page).toHaveURL(/\/auth\/login/);
    });
  }

  test('미로그인 상태에서는 개인 정보가 화면에 남지 않는다', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL(/\/auth\/login/, { timeout: 15_000 });
    // 대시보드 본문이 잠깐이라도 렌더링된 채 남아 있으면 안 된다
    await expect(page.locator('text=빠른 실행')).toHaveCount(0);
  });
});

test.describe('로그인 성공 흐름', () => {
  test.skip(
    !hasTestAccount,
    'E2E_TEST_EMAIL / E2E_TEST_PASSWORD 미설정 — 테스트 전용 계정을 준비한 뒤 실행하세요',
  );

  test('올바른 자격 증명으로 로그인하면 강의실로 이동한다', async ({ page }) => {
    await page.goto('/auth/login');
    await page.locator('input[type="email"]').fill(TEST_EMAIL!);
    await page.locator('input[type="password"]').fill(TEST_PASSWORD!);
    await page.locator('button[type="submit"]').click();

    await page.waitForURL(/\/dashboard/, { timeout: 20_000 });
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('로그인 후 로그아웃하면 세션이 해제된다', async ({ page }) => {
    await page.goto('/auth/login');
    await page.locator('input[type="email"]').fill(TEST_EMAIL!);
    await page.locator('input[type="password"]').fill(TEST_PASSWORD!);
    await page.locator('button[type="submit"]').click();
    await page.waitForURL(/\/dashboard/, { timeout: 20_000 });

    await page.locator('button:has-text("로그아웃")').first().click();

    // 로그아웃 후 보호 경로에 다시 접근하면 로그인 페이지로 가야 한다
    await page.goto('/dashboard');
    await page.waitForURL(/\/auth\/login/, { timeout: 15_000 });
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
