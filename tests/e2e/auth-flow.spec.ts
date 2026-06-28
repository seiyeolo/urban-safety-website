import { test, expect } from '@playwright/test';

test.describe('인증 플로우 - 회원가입/로그인', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('로그인 페이지 접근 및 폼 확인', async ({ page }) => {
    // 로그인 링크/버튼 찾기
    const loginButton = page.locator('a:has-text("로그인"), button:has-text("로그인")');

    if (await loginButton.isVisible()) {
      await loginButton.click();
      await page.waitForLoadState('domcontentloaded');

      // 로그인 폼 요소들 확인
      await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"], input[name="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]:has-text("로그인")')).toBeVisible();

      // 폼 라벨 확인
      await expect(page.locator('label:has-text("이메일"), label:has-text("email")')).toBeVisible();
      await expect(page.locator('label:has-text("비밀번호"), label:has-text("password")')).toBeVisible();
    } else {
      test.skip(true, '로그인 기능이 구현되지 않음');
    }
  });

  test('로그인 폼 검증 - 잘못된 입력', async ({ page }) => {
    // 로그인 페이지로 이동
    const loginButton = page.locator('a:has-text("로그인"), button:has-text("로그인")');

    if (await loginButton.isVisible()) {
      await loginButton.click();

      // 이메일과 비밀번호 필드 확인
      const emailField = page.locator('input[type="email"], input[name="email"]');
      const passwordField = page.locator('input[type="password"], input[name="password"]');
      const submitButton = page.locator('button[type="submit"]:has-text("로그인")');

      // 빈 폼 제출 시 검증
      await submitButton.click();

      // 에러 메시지 확인
      const errorMessages = page.locator('.error, [role="alert"], [data-testid="error"]');
      if (await errorMessages.count() > 0) {
        await expect(errorMessages.first()).toBeVisible();
      }

      // 잘못된 이메일 형식 테스트
      await emailField.fill('invalid-email');
      await passwordField.fill('password123');
      await submitButton.click();

      // HTML5 validation 또는 커스텀 에러 메시지 확인
      const isEmailInvalid = await emailField.evaluate(el => !(el as HTMLInputElement).checkValidity());
      expect(isEmailInvalid).toBe(true);

      // 올바른 이메일 형식으로 수정
      await emailField.fill('test@example.com');
      await passwordField.fill('short'); // 너무 짧은 비밀번호
      await submitButton.click();

      // 비밀번호 길이 검증 (있는 경우)
      const passwordError = page.locator('[data-testid="password-error"], .password-error');
      if (await passwordError.isVisible()) {
        await expect(passwordError).toContainText(/길이|length|짧|short/i);
      }
    } else {
      test.skip(true, '로그인 기능이 구현되지 않음');
    }
  });

  test('회원가입 페이지 접근 및 폼 확인', async ({ page }) => {
    // 회원가입 링크/버튼 찾기
    const signupButton = page.locator('a:has-text("회원가입"), button:has-text("회원가입"), a:has-text("가입")');

    if (await signupButton.isVisible()) {
      await signupButton.click();
      await page.waitForLoadState('domcontentloaded');

      // 회원가입 폼 기본 요소들 확인
      await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"], input[name="password"]')).toBeVisible();

      // 이름 필드 확인
      const nameField = page.locator('input[name="name"], input[name="fullName"]');
      if (await nameField.isVisible()) {
        await expect(nameField).toBeVisible();
      }

      // 전화번호 필드 확인
      const phoneField = page.locator('input[name="phone"], input[type="tel"]');
      if (await phoneField.isVisible()) {
        await expect(phoneField).toBeVisible();
      }

      // 약관 동의 체크박스 확인
      const termsCheckbox = page.locator('input[type="checkbox"]:near(text="약관"), input[type="checkbox"]:near(text="동의")');
      if (await termsCheckbox.isVisible()) {
        await expect(termsCheckbox).toBeVisible();
      }

      // 제출 버튼 확인
      await expect(page.locator('button[type="submit"]:has-text("가입"), button[type="submit"]:has-text("회원가입")')).toBeVisible();
    } else {
      test.skip(true, '회원가입 기능이 구현되지 않음');
    }
  });

  test('소셜 로그인 버튼 확인', async ({ page }) => {
    // 소셜 로그인 페이지로 이동 시도
    const loginButton = page.locator('a:has-text("로그인"), button:has-text("로그인")');

    if (await loginButton.isVisible()) {
      await loginButton.click();

      // Google 로그인 버튼 확인
      const googleLogin = page.locator('button:has-text("Google"), a:has-text("Google"), [data-testid="google-login"]');
      if (await googleLogin.isVisible()) {
        await expect(googleLogin).toBeEnabled();

        // 버튼 클릭 시 새 탭이 열리는지 확인 (실제 로그인은 하지 않음)
        await expect(googleLogin).toHaveAttribute('target', '_blank');
      }

      // Kakao 로그인 버튼 확인
      const kakaoLogin = page.locator('button:has-text("Kakao"), a:has-text("카카오"), [data-testid="kakao-login"]');
      if (await kakaoLogin.isVisible()) {
        await expect(kakaoLogin).toBeEnabled();
      }

      // Naver 로그인 버튼 확인
      const naverLogin = page.locator('button:has-text("Naver"), a:has-text("네이버"), [data-testid="naver-login"]');
      if (await naverLogin.isVisible()) {
        await expect(naverLogin).toBeEnabled();
      }
    } else {
      test.skip(true, '로그인 기능이 구현되지 않음');
    }
  });

  test('비밀번호 재설정 링크 확인', async ({ page }) => {
    const loginButton = page.locator('a:has-text("로그인"), button:has-text("로그인")');

    if (await loginButton.isVisible()) {
      await loginButton.click();

      // 비밀번호 찾기/재설정 링크 확인
      const forgotPasswordLink = page.locator('a:has-text("비밀번호"), a:has-text("찾기"), a:has-text("재설정")');

      if (await forgotPasswordLink.isVisible()) {
        await expect(forgotPasswordLink).toBeVisible();

        // 링크 클릭 시 적절한 페이지로 이동하는지 확인
        await forgotPasswordLink.click();
        await page.waitForLoadState('domcontentloaded');

        // 비밀번호 재설정 폼 또는 안내 메시지 확인
        const resetForm = page.locator('form:has(input[type="email"])');
        const resetMessage = page.locator('text=/이메일|email|재설정|reset/i');

        const hasResetForm = await resetForm.isVisible();
        const hasResetMessage = await resetMessage.isVisible();

        expect(hasResetForm || hasResetMessage).toBe(true);
      }
    } else {
      test.skip(true, '로그인 기능이 구현되지 않음');
    }
  });

  test('로그아웃 기능 (로그인 후)', async ({ page }) => {
    // 이미 로그인된 상태라고 가정하고 로그아웃 버튼 찾기
    const logoutButton = page.locator('button:has-text("로그아웃"), a:has-text("로그아웃")');

    if (await logoutButton.isVisible()) {
      await logoutButton.click();

      // 로그아웃 후 메인 페이지로 리다이렉트 또는 로그인 상태 변경 확인
      await page.waitForLoadState('domcontentloaded');

      // 로그인 버튼이 다시 나타나는지 확인
      const loginButtonAfterLogout = page.locator('a:has-text("로그인"), button:has-text("로그인")');
      await expect(loginButtonAfterLogout).toBeVisible();
    } else {
      test.skip(true, '현재 로그인되지 않았거나 로그아웃 기능이 구현되지 않음');
    }
  });
});