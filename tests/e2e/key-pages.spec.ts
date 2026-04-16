import { test, expect } from '@playwright/test';
import { TestUtils } from '../helpers/test-utils';

test.describe('핵심 정보 페이지 테스트', () => {
  test('/fields - 핵심분야 페이지', async ({ page }) => {
    await page.goto('/fields');
    const utils = new TestUtils(page);

    // 페이지 로딩 확인
    const loadTime = await utils.measurePageLoad();
    expect(loadTime).toBeLessThan(3000);

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/핵심분야|fields/i);

    // 핵심 콘텐츠 영역 확인
    await expect(page.locator('main, [role="main"]')).toBeVisible();

    // 분야별 콘텐츠 카드/섹션 확인
    const contentSections = page.locator('.field, .area, .section, [data-testid*="field"]');
    expect(await contentSections.count()).toBeGreaterThan(0);

    // 각 분야 제목과 설명이 있는지 확인
    const headings = page.locator('h1, h2, h3');
    expect(await headings.count()).toBeGreaterThan(1);

    // 관련 이미지나 아이콘 확인
    const images = page.locator('img');
    if (await images.count() > 0) {
      // 이미지 alt 텍스트 확인 (접근성)
      const imagesWithAlt = page.locator('img[alt]');
      expect(await imagesWithAlt.count()).toBe(await images.count());
    }
  });

  test('/certificates - 민간자격증 페이지', async ({ page }) => {
    await page.goto('/certificates');
    const utils = new TestUtils(page);

    // 페이지 로딩 확인
    const loadTime = await utils.measurePageLoad();
    expect(loadTime).toBeLessThan(3000);

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/민간자격증|자격증|certificate/i);

    // 자격증 목록 또는 카드 확인
    const certCards = page.locator('.certificate, .cert, [data-testid*="cert"]');
    if (await certCards.count() === 0) {
      // 다른 선택자로 시도
      const listItems = page.locator('li, .item, .course');
      expect(await listItems.count()).toBeGreaterThan(0);
    }

    // 자격증명, 기간, 수강료 등 핵심 정보 확인
    const priceElements = page.locator('text=/\\d+원|\\d+,\\d+|원|₩|price/i');
    const durationElements = page.locator('text=/\\d+시간|\\d+일|\\d+주|시간|기간|duration/i');

    // 최소한 하나는 있어야 함
    const hasPriceInfo = await priceElements.count() > 0;
    const hasDurationInfo = await durationElements.count() > 0;
    expect(hasPriceInfo || hasDurationInfo).toBe(true);

    // 신청 또는 문의 버튼 확인
    const applyButtons = page.locator('button:has-text("신청"), a:has-text("신청"), button:has-text("문의"), a:has-text("문의")');
    if (await applyButtons.count() > 0) {
      await expect(applyButtons.first()).toBeEnabled();
    }
  });

  test('/education - 교육안내 페이지', async ({ page }) => {
    await page.goto('/education');
    const utils = new TestUtils(page);

    // 페이지 로딩 확인
    const loadTime = await utils.measurePageLoad();
    expect(loadTime).toBeLessThan(3000);

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/교육|education/i);

    // 교육과정 정보 확인
    const courseInfo = page.locator('.course, .program, .curriculum, [data-testid*="course"]');
    if (await courseInfo.count() === 0) {
      // 대체 선택자로 확인
      const sections = page.locator('section, .section, div:has(h2), div:has(h3)');
      expect(await sections.count()).toBeGreaterThan(0);
    }

    // 교육 일정 확인
    const scheduleElements = page.locator('text=/\\d{4}-\\d{2}-\\d{2}|\\d+월\\s*\\d+일|일정|schedule/i');
    const timeElements = page.locator('text=/\\d+:\\d+|오전|오후|am|pm|시간/i');

    // 일정 정보가 있는지 확인
    const hasScheduleInfo = await scheduleElements.count() > 0;
    const hasTimeInfo = await timeElements.count() > 0;

    // 교육 관련 핵심 정보 중 하나는 있어야 함
    expect(hasScheduleInfo || hasTimeInfo).toBe(true);

    // 교육 신청 버튼 확인
    const applyButton = page.locator('button:has-text("신청"), a:has-text("신청"), button:has-text("등록"), a:has-text("등록")');
    if (await applyButton.isVisible()) {
      await expect(applyButton).toBeEnabled();
    }
  });

  test('/contact - 문의 페이지', async ({ page }) => {
    await page.goto('/contact');
    const utils = new TestUtils(page);

    // 페이지 로딩 확인
    const loadTime = await utils.measurePageLoad();
    expect(loadTime).toBeLessThan(3000);

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/문의|contact/i);

    // 연락처 정보 확인
    const phoneNumber = page.locator('text=/042-254-8060|전화|phone/i');
    expect(await phoneNumber.count()).toBeGreaterThan(0);

    // 주소 정보 확인
    const addressInfo = page.locator('text=/대전|주소|address/i');
    expect(await addressInfo.count()).toBeGreaterThan(0);

    // 문의 폼 확인 (있는 경우)
    const contactForm = page.locator('form');
    if (await contactForm.isVisible()) {
      // 이름 필드
      const nameField = page.locator('input[name="name"], input[placeholder*="이름"], input[placeholder*="name"]');
      if (await nameField.isVisible()) {
        await expect(nameField).toBeVisible();
      }

      // 이메일 필드
      const emailField = page.locator('input[type="email"], input[name="email"]');
      if (await emailField.isVisible()) {
        await expect(emailField).toBeVisible();
      }

      // 메시지 필드
      const messageField = page.locator('textarea, input[name="message"]');
      if (await messageField.isVisible()) {
        await expect(messageField).toBeVisible();
      }

      // 제출 버튼
      const submitButton = page.locator('button[type="submit"], input[type="submit"]');
      if (await submitButton.isVisible()) {
        await expect(submitButton).toBeEnabled();
      }
    }

    // 지도 또는 위치 정보 확인 (있는 경우)
    const mapElement = page.locator('iframe[src*="maps"], .map, [data-testid="map"]');
    if (await mapElement.isVisible()) {
      await expect(mapElement).toBeVisible();
    }

    // 운영시간 정보 확인
    const hoursInfo = page.locator('text=/운영시간|영업시간|오전|오후|시-|시~|hours/i');
    if (await hoursInfo.count() > 0) {
      await expect(hoursInfo.first()).toBeVisible();
    }
  });

  test('모든 핵심 페이지 네비게이션 일관성', async ({ page }) => {
    const keyPages = ['/fields', '/certificates', '/education', '/contact'];

    for (const pagePath of keyPages) {
      await page.goto(pagePath);

      // 공통 헤더 확인
      await expect(page.locator('header')).toBeVisible();

      // 로고가 메인 페이지로 연결되는지 확인
      const logo = page.locator('a[href="/"], img[alt*="로고"], [data-testid="logo"]');
      if (await logo.isVisible()) {
        await expect(logo).toHaveAttribute('href', '/');
      }

      // 공통 네비게이션 메뉴 확인
      await expect(page.locator('nav')).toBeVisible();

      // 공통 푸터 확인
      await expect(page.locator('footer')).toBeVisible();

      // 각 페이지에서 다른 페이지로의 네비게이션 링크 확인
      const navLinks = page.locator('nav a');
      expect(await navLinks.count()).toBeGreaterThan(3);
    }
  });

  test('페이지 간 링크 연결성', async ({ page }) => {
    await page.goto('/');
    const utils = new TestUtils(page);

    // 모든 내부 링크 확인
    const linkCheck = await utils.checkAllLinks();

    // 깨진 링크가 있는지 확인
    expect(linkCheck.broken.length).toBe(0);

    // 작동하는 링크가 있는지 확인
    expect(linkCheck.working.length).toBeGreaterThan(0);

    console.log(`Working links: ${linkCheck.working.length}`);
    console.log(`Broken links: ${linkCheck.broken.length}`);
    if (linkCheck.broken.length > 0) {
      console.log('Broken links:', linkCheck.broken);
    }
  });
});