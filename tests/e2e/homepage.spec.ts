import { test, expect } from '@playwright/test';
import { TestUtils } from '../helpers/test-utils';

test.describe('Homepage - 메인 페이지 접근성', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('페이지 로딩 및 기본 렌더링', async ({ page }) => {
    const utils = new TestUtils(page);

    // 페이지 로딩 시간 측정 (3초 이내)
    const loadTime = await utils.measurePageLoad();
    expect(loadTime).toBeLessThan(3000);

    // 페이지 타이틀 확인
    await expect(page).toHaveTitle(/대전경실련 도시안전디자인센터/);

    // 메인 헤더 요소들 확인
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav[role="navigation"]')).toBeVisible();

    // 메인 콘텐츠 영역 확인
    await expect(page.locator('main, [role="main"]')).toBeVisible();

    // 푸터 확인
    await expect(page.locator('footer')).toBeVisible();
  });

  test('네비게이션 메뉴 작동', async ({ page }) => {
    // 메인 네비게이션 링크들 확인 (실제 사이트 구조에 맞게 조정)
    const navLinks = [
      { text: '센터소개', href: '#' },
      { text: '핵심분야', href: '#' },
      { text: '민간자격증', href: '#' },
      { text: '교육안내', href: '#' },
      { text: '사업', href: '#' },
      { text: '자료실', href: '#' },
      { text: '문의', href: '#' }
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`nav a:has-text("${link.text}")`);
      await expect(navLink).toBeVisible();

      // 링크가 존재하는지만 확인 (# 링크는 실제 이동하지 않음)
      const href = await navLink.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('반응형 디자인 - 모바일/데스크톱', async ({ page }) => {
    const utils = new TestUtils(page);
    await utils.testResponsiveDesign();
  });

  test('모바일 메뉴 토글 (햄버거 메뉴)', async ({ page }) => {
    // 모바일 뷰포트로 변경
    await page.setViewportSize({ width: 375, height: 667 });

    // 햄버거 메뉴 버튼 찾기
    const menuToggle = page.locator('[data-testid="mobile-menu-toggle"], button:has-text("메뉴")');

    if (await menuToggle.isVisible()) {
      // 메뉴 클릭
      await menuToggle.click();

      // 모바일 메뉴가 열렸는지 확인
      const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu');
      await expect(mobileMenu).toBeVisible();

      // 다시 클릭해서 닫기
      await menuToggle.click();
      await expect(mobileMenu).not.toBeVisible();
    }
  });

  test('핵심 CTA 버튼들 확인', async ({ page }) => {
    // 주요 액션 버튼들 확인
    const ctaButtons = [
      '교육신청',
      '자격증 안내',
      '문의하기',
      '상담신청'
    ];

    for (const buttonText of ctaButtons) {
      const button = page.locator(`button:has-text("${buttonText}"), a:has-text("${buttonText}")`);
      if (await button.isVisible()) {
        await expect(button).toBeEnabled();

        // 버튼 호버 효과 확인
        await button.hover();
        await page.waitForTimeout(100);
      }
    }
  });

  test('연락처 정보 표시', async ({ page }) => {
    // 전화번호 확인 (첫 번째 요소만)
    const phoneNumber = page.locator('text=042-254-8060').first();
    await expect(phoneNumber).toBeVisible();

    // 주소 정보 확인 (보통 푸터에 있음)
    const addressElements = page.locator('text=/대전/');
    expect(await addressElements.count()).toBeGreaterThan(0);
  });

  test('소셜 미디어 링크 (있는 경우)', async ({ page }) => {
    const socialLinks = [
      'facebook',
      'twitter',
      'instagram',
      'youtube',
      'blog'
    ];

    for (const social of socialLinks) {
      const socialLink = page.locator(`a[href*="${social}"], [data-testid="${social}-link"]`);
      if (await socialLink.isVisible()) {
        await expect(socialLink).toHaveAttribute('target', '_blank');
      }
    }
  });
});