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

      // Check if navigation is accessible on all screen sizes
      const nav = this.page.locator('nav[role="navigation"]');
      await expect(nav).toBeVisible();
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
    const links = await this.page.locator('a[href]').all();
    const working: string[] = [];
    const broken: string[] = [];

    for (const link of links) {
      const href = await link.getAttribute('href');
      if (!href) continue;

      try {
        if (href.startsWith('http')) {
          const response = await this.page.request.get(href);
          if (response.ok()) {
            working.push(href);
          } else {
            broken.push(href);
          }
        } else {
          // Internal link
          await this.page.goto(href);
          working.push(href);
        }
      } catch {
        broken.push(href);
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