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

    // 분야별 콘텐츠 블록 확인 (Tailwind 프로젝트라 .field 같은 클래스는 없다 — 시맨틱 구조로 검증)
    const contentSections = page.locator('main section, main article');
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
    // 헤더 CTA('자격증 신청')와 구분되도록 본문 영역으로 한정한다
    const applyButton = page
      .locator('main')
      .locator('button:has-text("신청"), a:has-text("신청"), button:has-text("등록"), a:has-text("등록")')
      .first();
    await expect(applyButton).toBeVisible();
    await expect(applyButton).toBeEnabled();
  });

  test('/education - 수강 신청 폼이 문의 API로 연결된다', async ({ page }) => {
    // 객체에 담아 둔다 — 지역 변수로 두면 TypeScript가 "콜백이 실행됐는지 모른다"고 보고
    // 단언 이후 타입을 never로 좁혀 버린다 (@ts-ignore나 as 없이 우회하는 방법)
    const captured: { payload: Record<string, unknown> | null } = { payload: null };

    await page.route('**/api/contact', async (route) => {
      captured.payload = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto('/education');

    const main = page.locator('main');
    await main.getByLabel('이름').fill('홍길동');
    await main.getByLabel('연락처').fill('010-1234-5678');
    await main.getByLabel('이메일').fill('hong@example.com');
    await main.getByLabel('특이사항/질문 (선택사항)').fill('오전 수강 가능 여부를 알고 싶습니다.');
    await main.getByLabel(/개인정보처리방침/).check();
    await main.getByRole('button', { name: '수강 신청하기' }).click();

    await expect(main.getByText('수강 신청이 접수되었습니다.')).toBeVisible();
    expect(captured.payload).toMatchObject({
      name: '홍길동',
      phone: '010-1234-5678',
      email: 'hong@example.com',
      inquiryType: '교육 신청',
      privacyConsent: true,
    });
    expect(String(captured.payload?.title)).toContain('[교육 신청]');
    expect(String(captured.payload?.message)).toContain('[특이사항/질문]');
  });

  /**
   * ⚠️ IA 문제 (테스트가 아니라 사이트 구조 쪽 과제)
   * /contact 는 현재 '오시는 길'(약도·교통·주차) 페이지이고,
   * 실제 문의 폼은 /contact/education, /contact/group, /contact/partner 에 있다.
   * 헤더 메뉴가 '문의'인데 들어가면 약도가 나오므로 사용자 기대와 어긋난다.
   * 경로 재편은 별도 결정이 필요해, 이 테스트는 현재 구조를 있는 그대로 검증한다.
   */
  test('/contact - 오시는 길 페이지', async ({ page }) => {
    await page.goto('/contact');
    const utils = new TestUtils(page);

    // 페이지 로딩 확인
    const loadTime = await utils.measurePageLoad();
    expect(loadTime).toBeLessThan(3000);

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/오시는 길|contact/i);

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
      // 로고 링크(헤더 내 홈 링크)만 대상 — img에는 href가 없어 함께 잡으면 strict mode 위반
      const logo = page.locator('header a[href="/"]').first();
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('href', '/');

      // 공통 네비게이션 메뉴 확인 (breadcrumb도 <nav>이므로 헤더 내비로 한정)
      await expect(page.locator('header nav').first()).toBeVisible();

      // 공통 푸터 확인
      await expect(page.locator('footer')).toBeVisible();

      // 각 페이지에서 다른 페이지로의 네비게이션 링크 확인
      const navLinks = page.locator('header nav a');
      expect(await navLinks.count()).toBeGreaterThan(3);
    }
  });

  test('페이지 간 링크 연결성', async ({ page }) => {
    // 홈의 내부 링크를 전수 확인하므로 기본 30초로는 부족하다
    test.setTimeout(120_000);
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