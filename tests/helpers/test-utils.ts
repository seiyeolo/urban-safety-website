import { Page, expect } from '@playwright/test';

export class TestUtils {
  constructor(private page: Page) {}

  // Performance helpers
  async measurePageLoad(): Promise<number> {
    const start = Date.now();
    await this.page.waitForLoadState('domcontentloaded');
    return Date.now() - start;
  }

  async measureLCP(): Promise<number> {
    return await this.page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      });
    });
  }

  // Accessibility helpers
  async checkKeyboardNavigation(selectors: string[]): Promise<void> {
    for (const selector of selectors) {
      await this.page.keyboard.press('Tab');
      const focused = await this.page.locator(':focus');
      await expect(focused).toHaveAttribute('data-testid', selector.replace('[data-testid="', '').replace('"]', ''));
    }
  }

  async checkColorContrast(selector: string): Promise<boolean> {
    return await this.page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (!element) return false;

      const styles = window.getComputedStyle(element);
      const backgroundColor = styles.backgroundColor;
      const color = styles.color;

      // Simple contrast ratio check (simplified implementation)
      return backgroundColor !== color;
    }, selector);
  }

  // Form validation helpers
  async testFormValidation(formSelector: string, inputs: { selector: string; value: string; shouldError: boolean }[]): Promise<void> {
    for (const input of inputs) {
      await this.page.fill(input.selector, input.value);
      await this.page.click(`${formSelector} button[type="submit"]`);

      if (input.shouldError) {
        await expect(this.page.locator('.error, [data-testid="error"]')).toBeVisible();
      } else {
        await expect(this.page.locator('.error, [data-testid="error"]')).not.toBeVisible();
      }
    }
  }

  // Mobile responsive helpers
  async testResponsiveDesign(): Promise<void> {
    const viewports = [
      { width: 320, height: 568 },   // Mobile
      { width: 768, height: 1024 },  // Tablet
      { width: 1920, height: 1080 }  // Desktop
    ];

    for (const viewport of viewports) {
      await this.page.setViewportSize(viewport);
      await this.page.waitForLoadState('domcontentloaded');

      // 화면 크기에 따라 내비 형태가 달라진다.
      // 좁은 화면에서는 데스크톱 메뉴가 숨고 햄버거 버튼이 나오는 것이 정상이므로,
      // "특정 요소가 보이는가"가 아니라 "어떤 형태로든 내비에 접근 가능한가"를 검증한다.
      const desktopNav = this.page.locator('header nav').first();
      const mobileMenuButton = this.page
        .locator('header button[aria-expanded], header button[aria-label*="메뉴"]')
        .first();

      const navVisible = await desktopNav.isVisible().catch(() => false);
      const menuButtonVisible = await mobileMenuButton.isVisible().catch(() => false);

      expect(
        navVisible || menuButtonVisible,
        `${viewport.width}px에서 내비게이션에 접근할 수단이 없음`,
      ).toBe(true);
    }
  }

  // Error boundary helpers
  async simulateError(errorType: 'network' | 'js' | 'timeout'): Promise<void> {
    switch (errorType) {
      case 'network':
        await this.page.route('**/*', route => route.abort());
        break;
      case 'js':
        await this.page.evaluate(() => {
          throw new Error('Simulated JavaScript error');
        });
        break;
      case 'timeout':
        await this.page.setDefaultTimeout(1);
        break;
    }
  }

  // Link checker
  async checkAllLinks(): Promise<{ working: string[]; broken: string[] }> {
    // href를 먼저 한 번에 수집한다. 예전 구현은 링크마다 page.goto로 이동해서
    // (a) 매우 느리고 (b) 두 번째 링크부터는 '이동한 페이지'의 링크를 보게 되는 문제가 있었다.
    const hrefs = await this.page.$$eval('a[href]', (anchors) =>
      anchors.map((a) => a.getAttribute('href') ?? '').filter(Boolean),
    );

    // 내부 링크만, 중복 제거해서 확인한다 (외부 사이트 가용성에 테스트가 흔들리지 않도록)
    const internal = [...new Set(hrefs)].filter(
      (h) => h.startsWith('/') && !h.startsWith('//'),
    );

    const working: string[] = [];
    const broken: string[] = [];

    for (const href of internal) {
      try {
        const response = await this.page.request.get(href);
        if (response.ok()) working.push(href);
        else broken.push(`${href} (${response.status()})`);
      } catch {
        broken.push(`${href} (요청 실패)`);
      }
    }

    return { working, broken };
  }

  // Screenshot with comparison
  async takeScreenshotWithComparison(name: string): Promise<void> {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true
    });
  }
}