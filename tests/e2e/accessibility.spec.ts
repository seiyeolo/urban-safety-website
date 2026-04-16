import { test, expect } from '@playwright/test';
import { TestUtils } from '../helpers/test-utils';

test.describe('접근성 테스트 (WCAG 2.1 AA)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('키보드 네비게이션 - Tab 순서', async ({ page }) => {
    const utils = new TestUtils(page);

    // 탭 가능한 요소들 확인
    const focusableElements = await page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').all();
    expect(focusableElements.length).toBeGreaterThan(0);

    // 각 요소에 Tab으로 이동하여 포커스 확인
    for (let i = 0; i < Math.min(focusableElements.length, 10); i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();

      // 포커스된 요소가 시각적으로 구분되는지 확인
      const focusStyles = await focused.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          outlineColor: styles.outlineColor,
          boxShadow: styles.boxShadow
        };
      });

      // 포커스 표시가 있는지 확인 (outline이나 box-shadow)
      const hasFocusIndicator =
        focusStyles.outline !== 'none' ||
        focusStyles.outlineWidth !== '0px' ||
        focusStyles.boxShadow !== 'none';

      expect(hasFocusIndicator).toBe(true);
    }
  });

  test('키보드 네비게이션 - Enter/Space 활성화', async ({ page }) => {
    // 첫 번째 버튼을 찾아 키보드로 활성화
    const firstButton = page.locator('button').first();
    if (await firstButton.isVisible()) {
      await firstButton.focus();

      // Enter 키로 버튼 클릭
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);

      // Space 키로도 시도 (버튼의 경우)
      await page.keyboard.press('Space');
      await page.waitForTimeout(100);
    }

    // 첫 번째 링크를 찾아 Enter로 활성화
    const firstLink = page.locator('a[href]').first();
    if (await firstLink.isVisible()) {
      await firstLink.focus();

      // Enter 키로 링크 활성화 (실제 이동하지 않고 href 확인만)
      const href = await firstLink.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('Alt 텍스트 - 모든 이미지', async ({ page }) => {
    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');

      if (src && !src.includes('placeholder')) {
        // 의미 있는 이미지는 alt 텍스트가 있어야 함
        expect(alt).toBeTruthy();
        expect(alt?.trim().length).toBeGreaterThan(0);
      } else {
        // 장식용 이미지는 빈 alt 텍스트여야 함
        expect(alt === '' || alt === null).toBe(true);
      }
    }
  });

  test('색상 대비 검사', async ({ page }) => {
    const utils = new TestUtils(page);

    // 주요 텍스트 요소들의 색상 대비 확인
    const textElements = [
      'h1', 'h2', 'h3', 'p', 'a', 'button', 'label'
    ];

    for (const selector of textElements) {
      const elements = await page.locator(selector).all();

      for (const element of elements.slice(0, 5)) { // 처음 5개만 테스트
        if (await element.isVisible()) {
          const contrastRatio = await element.evaluate(el => {
            const styles = window.getComputedStyle(el);
            const backgroundColor = styles.backgroundColor;
            const color = styles.color;

            // RGB 값을 추출하여 간단한 대비 계산
            const getRGB = (colorStr: string) => {
              const match = colorStr.match(/rgb\((\d+), (\d+), (\d+)\)/);
              return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
            };

            const bgRGB = getRGB(backgroundColor);
            const textRGB = getRGB(color);

            // 간단한 대비 계산 (실제 WCAG 계산보다 단순화)
            const bgLuminance = (bgRGB[0] * 0.299 + bgRGB[1] * 0.587 + bgRGB[2] * 0.114) / 255;
            const textLuminance = (textRGB[0] * 0.299 + textRGB[1] * 0.587 + textRGB[2] * 0.114) / 255;

            return Math.abs(bgLuminance - textLuminance);
          });

          // 최소 대비 확인 (실제로는 더 정교한 계산 필요)
          expect(contrastRatio).toBeGreaterThan(0.3);
        }
      }
    }
  });

  test('헤딩 구조 - 논리적 순서', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels: number[] = [];

    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.charAt(1));
      headingLevels.push(level);
    }

    // H1이 있는지 확인
    expect(headingLevels).toContain(1);

    // 헤딩 레벨이 논리적으로 구성되어 있는지 확인
    for (let i = 1; i < headingLevels.length; i++) {
      const current = headingLevels[i];
      const previous = headingLevels[i - 1];

      // 헤딩 레벨이 2단계 이상 건너뛰면 안됨
      if (current > previous) {
        expect(current - previous).toBeLessThanOrEqual(1);
      }
    }
  });

  test('폼 라벨과 에러 메시지', async ({ page }) => {
    const formInputs = await page.locator('input, textarea, select').all();

    for (const input of formInputs) {
      const inputId = await input.getAttribute('id');
      const inputName = await input.getAttribute('name');
      const inputType = await input.getAttribute('type');

      // hidden input은 제외
      if (inputType === 'hidden') continue;

      // 라벨이 있는지 확인
      let hasLabel = false;

      if (inputId) {
        const label = page.locator(`label[for="${inputId}"]`);
        hasLabel = await label.isVisible();
      }

      if (!hasLabel) {
        // aria-label이나 aria-labelledby가 있는지 확인
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledby = await input.getAttribute('aria-labelledby');

        hasLabel = !!(ariaLabel || ariaLabelledby);
      }

      if (!hasLabel) {
        // placeholder가 라벨 역할을 하는지 확인
        const placeholder = await input.getAttribute('placeholder');
        hasLabel = !!placeholder;
      }

      expect(hasLabel).toBe(true);
    }
  });

  test('ARIA 속성 적절성', async ({ page }) => {
    // role 속성이 있는 요소들 확인
    const elementsWithRole = await page.locator('[role]').all();

    for (const element of elementsWithRole) {
      const role = await element.getAttribute('role');
      const validRoles = [
        'button', 'link', 'navigation', 'main', 'banner', 'contentinfo',
        'dialog', 'alert', 'alertdialog', 'menu', 'menuitem', 'tab', 'tabpanel'
      ];

      expect(validRoles).toContain(role);
    }

    // aria-expanded가 있는 요소들 확인 (드롭다운, 아코디언 등)
    const expandableElements = await page.locator('[aria-expanded]').all();

    for (const element of expandableElements) {
      const expanded = await element.getAttribute('aria-expanded');
      expect(['true', 'false']).toContain(expanded);
    }

    // aria-label이 빈 값이 아닌지 확인
    const elementsWithAriaLabel = await page.locator('[aria-label]').all();

    for (const element of elementsWithAriaLabel) {
      const ariaLabel = await element.getAttribute('aria-label');
      expect(ariaLabel?.trim().length).toBeGreaterThan(0);
    }
  });

  test('스킵 링크 - 메인 콘텐츠로 이동', async ({ page }) => {
    // 스킵 링크가 있는지 확인
    const skipLink = page.locator('a[href="#main"], a:has-text("본문으로"), a:has-text("skip")').first();

    if (await skipLink.isVisible()) {
      await skipLink.click();

      // 메인 콘텐츠 영역으로 포커스가 이동했는지 확인
      const mainContent = page.locator('#main, main, [role="main"]');
      await expect(mainContent).toBeFocused();
    } else {
      // 스킵 링크가 숨겨져 있다가 포커스를 받으면 나타나는 경우
      await page.keyboard.press('Tab');
      const firstFocusable = page.locator(':focus');
      const text = await firstFocusable.textContent();

      if (text?.includes('본문') || text?.includes('skip') || text?.includes('메인')) {
        await firstFocusable.click();
        const mainContent = page.locator('#main, main, [role="main"]');
        await expect(mainContent).toBeVisible();
      }
    }
  });

  test('언어 설정', async ({ page }) => {
    // html lang 속성 확인
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('ko');

    // 다국어 콘텐츠가 있는 경우 lang 속성 확인
    const foreignLanguageElements = await page.locator('[lang]:not([lang="ko"])').all();

    for (const element of foreignLanguageElements) {
      const lang = await element.getAttribute('lang');
      expect(lang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/); // ISO 언어 코드 형식
    }
  });

  test('포커스 관리 - 모달/팝업', async ({ page }) => {
    // 모달 트리거 버튼 찾기
    const modalTriggers = await page.locator('button:has-text("팝업"), button:has-text("모달"), [data-testid*="modal"]').all();

    for (const trigger of modalTriggers.slice(0, 2)) { // 처음 2개만 테스트
      if (await trigger.isVisible()) {
        await trigger.click();
        await page.waitForTimeout(300);

        // 모달이 열렸는지 확인
        const modal = page.locator('[role="dialog"], .modal, [data-testid="modal"]');

        if (await modal.isVisible()) {
          // 포커스가 모달 내부로 이동했는지 확인
          const focusedElement = page.locator(':focus');
          const isInsideModal = await focusedElement.evaluate((el, modalEl) => {
            return modalEl?.contains(el);
          }, await modal.elementHandle());

          expect(isInsideModal).toBe(true);

          // ESC 키로 모달 닫기
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);

          // 모달이 닫혔는지 확인
          await expect(modal).not.toBeVisible();

          // 포커스가 원래 트리거로 돌아갔는지 확인
          await expect(trigger).toBeFocused();
        }
      }
    }
  });
});