import { test, expect } from '@playwright/test';
import { TestUtils } from '../helpers/test-utils';

test.describe('성능 테스트', () => {
  test('페이지 로딩 성능 - 메인 페이지', async ({ page }) => {
    const utils = new TestUtils(page);

    // 성능 메트릭 측정 시작
    const startTime = Date.now();

    await page.goto('/');

    // DOM Content Loaded 시간 측정
    const domContentLoadedTime = await utils.measurePageLoad();
    expect(domContentLoadedTime).toBeLessThan(3000); // 3초 이내

    // Largest Contentful Paint (LCP) 측정
    const lcpTime = await utils.measureLCP();
    expect(lcpTime).toBeLessThan(2500); // 2.5초 이내 (Good LCP)

    // 전체 로딩 시간
    const totalLoadTime = Date.now() - startTime;
    expect(totalLoadTime).toBeLessThan(5000); // 5초 이내

    console.log(`Page load metrics:
      - DOM Content Loaded: ${domContentLoadedTime}ms
      - LCP: ${lcpTime}ms
      - Total Load Time: ${totalLoadTime}ms`);
  });

  test('리소스 로딩 최적화', async ({ page }) => {
    const responses: { url: string; status: number; size: number; time: number }[] = [];

    // 네트워크 요청 모니터링
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        size: 0, // 실제 구현에서는 response body size 계산
        time: 0  // 실제 구현에서는 응답 시간 계산
      });
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 4xx, 5xx 에러 응답 확인
    const errorResponses = responses.filter(r => r.status >= 400);
    expect(errorResponses.length).toBe(0);

    if (errorResponses.length > 0) {
      console.log('Error responses:', errorResponses);
    }

    // CSS, JS 파일 압축 확인
    const staticAssets = responses.filter(r =>
      r.url.includes('.css') || r.url.includes('.js')
    );

    for (const asset of staticAssets) {
      expect(asset.status).toBe(200);
    }

    console.log(`Total network requests: ${responses.length}`);
    console.log(`Static assets: ${staticAssets.length}`);
  });

  test('이미지 최적화 확인', async ({ page }) => {
    await page.goto('/');

    // 모든 이미지 요소 확인
    const images = await page.locator('img').all();

    for (const img of images) {
      const src = await img.getAttribute('src');
      if (!src) continue;

      // 이미지가 로드되었는지 확인
      const isLoaded = await img.evaluate(el => (el as HTMLImageElement).complete);
      expect(isLoaded).toBe(true);

      // 이미지 크기 확인 (너무 크지 않은지)
      const dimensions = await img.evaluate(el => ({
        naturalWidth: (el as HTMLImageElement).naturalWidth,
        naturalHeight: (el as HTMLImageElement).naturalHeight,
        displayWidth: el.clientWidth,
        displayHeight: el.clientHeight
      }));

      // 표시 크기보다 2배 이상 큰 이미지는 최적화 필요
      if (dimensions.displayWidth > 0) {
        const widthRatio = dimensions.naturalWidth / dimensions.displayWidth;
        const heightRatio = dimensions.naturalHeight / dimensions.displayHeight;

        expect(widthRatio).toBeLessThan(3); // 3배 이하
        expect(heightRatio).toBeLessThan(3); // 3배 이하
      }

      // WebP나 AVIF 형식 사용 권장 (현재는 체크만)
      const isModernFormat = src.includes('.webp') || src.includes('.avif');
      if (!isModernFormat && src.includes('.jpg') || src.includes('.png')) {
        console.log(`Consider using WebP/AVIF for: ${src}`);
      }
    }

    console.log(`Total images checked: ${images.length}`);
  });

  test('JavaScript 번들 크기 및 로딩', async ({ page }) => {
    const scriptRequests: { url: string; status: number }[] = [];

    page.on('response', response => {
      if (response.url().includes('.js') && response.status() === 200) {
        scriptRequests.push({
          url: response.url(),
          status: response.status()
        });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // JavaScript 파일이 로드되었는지 확인
    expect(scriptRequests.length).toBeGreaterThan(0);

    // 모든 스크립트가 성공적으로 로드되었는지 확인
    for (const script of scriptRequests) {
      expect(script.status).toBe(200);
    }

    console.log(`JavaScript files loaded: ${scriptRequests.length}`);
  });

  test('폰트 로딩에 실패한 항목이 없다', async ({ page }) => {
    // 이전 구현은 재귀 호출마다 total/loaded/failed를 리셋하지 않고 누적해서,
    // 폰트가 아직 로딩 중이면 total만 계속 불어나 집계가 깨졌다.
    // (로컬 macOS는 빨라서 통과했지만 느린 CI 러너에서는 실패했다)
    // 표준 API인 document.fonts.ready로 로딩이 끝난 뒤 한 번만 센다.
    await page.goto('/');
    await page.waitForLoadState('load');

    const fontMetrics = await page.evaluate(async () => {
      // ready가 영원히 대기하는 상황을 대비해 타임아웃과 경쟁시킨다
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 8000)),
      ]);

      let loaded = 0;
      let failed = 0;
      let pending = 0;
      let skippedFallback = 0;
      const failedFamilies: string[] = [];

      document.fonts.forEach((font) => {
        // next/font가 레이아웃 시프트를 줄이려고 만드는 'X Fallback'은
        // `src: local(Arial)` 처럼 시스템 폰트를 참조한다(빌드 CSS에서 확인).
        // 해당 폰트가 없는 OS(리눅스 CI 등)에서는 error가 되지만 웹폰트
        // 로딩과는 무관하고 사용자 화면에도 영향이 없으므로 집계에서 뺀다.
        if (font.family.includes('Fallback')) {
          skippedFallback++;
          return;
        }

        if (font.status === 'loaded') loaded++;
        else if (font.status === 'error') {
          failed++;
          failedFamilies.push(font.family);
        } else pending++;
      });

      return { loaded, failed, pending, skippedFallback, failedFamilies };
    });

    // unicode-range로 쪼갠 서브셋은 해당 글자가 쓰일 때만 로드되므로
    // pending(unloaded)이 남는 것은 정상이다. 실패(error)만 문제로 본다.
    expect(
      fontMetrics.failed,
      `폰트 로딩 실패: ${fontMetrics.failedFamilies.join(', ')}`,
    ).toBe(0);
    expect(fontMetrics.loaded, '로드된 폰트가 하나도 없음').toBeGreaterThan(0);
  });

  test('CSS 차단 리소스 확인', async ({ page }) => {
    await page.goto('/');

    // 렌더링 차단 리소스 확인
    const renderBlockingResources = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      return links.map(link => ({
        href: (link as HTMLLinkElement).href,
        media: (link as HTMLLinkElement).media || 'all'
      }));
    });

    // 미디어 쿼리가 적절히 설정되어 있는지 확인
    const printStyles = renderBlockingResources.filter(resource =>
      resource.media === 'print'
    );

    console.log(`CSS resources: ${renderBlockingResources.length}`);
    console.log(`Print-only styles: ${printStyles.length}`);
  });

  test('모바일 성능 - 3G 네트워크 시뮬레이션', async ({ browser }) => {
    // 3G 네트워크 속도 시뮬레이션
    const context = await browser.newContext();
    await context.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 지연
      await route.continue();
    });

    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 375, height: 667 });

    const startTime = Date.now();

    await mobilePage.goto('/');
    await mobilePage.waitForLoadState('domcontentloaded');

    const loadTime = Date.now() - startTime;

    // 3G 환경에서 5초 이내 로딩
    expect(loadTime).toBeLessThan(5000);

    console.log(`Mobile 3G load time: ${loadTime}ms`);

    await mobilePage.close();
    await context.close();
  });

  test('정적 자산에 캐시 헤더가 설정된다', async ({ page }) => {
    // 이전 버전은 요청 수만 console.log 하고 expect가 없어 아무것도 검증하지 않았다.
    // (게다가 리스너를 goto 뒤에 붙여 첫 방문 요청은 항상 0으로 집계됐다)
    // 캐시의 실제 계약은 "빌드 산출물에 장기 캐시 헤더가 붙는가"이므로 그것을 본다.
    const staticAssets: Array<{ url: string; cacheControl: string | undefined }> = [];
    page.on('response', (response) => {
      const url = response.url();
      if (url.includes('/_next/static/')) {
        staticAssets.push({ url, cacheControl: response.headers()['cache-control'] });
      }
    });

    // 홈 히어로에 자동재생 비디오가 있어 networkidle이 오지 않는다 → load 기준으로 대기
    await page.goto('/');
    await page.waitForLoadState('load');

    expect(staticAssets.length, '정적 자산 요청이 하나도 관측되지 않음').toBeGreaterThan(0);

    const withoutCache = staticAssets.filter(
      (a) => !a.cacheControl || !a.cacheControl.includes('max-age'),
    );
    expect(
      withoutCache.map((a) => a.url),
      '빌드 해시가 붙은 정적 자산에는 max-age 캐시 헤더가 있어야 한다',
    ).toEqual([]);
  });

  test('Core Web Vitals 종합 측정', async ({ page }) => {
    await page.goto('/');

    // Core Web Vitals 측정
    const webVitals = await page.evaluate(() => {
      return new Promise<{
        lcp: number | null;
        fid: number | null;
        cls: number | null;
      }>((resolve) => {
        const vitals: { lcp: number | null; fid: number | null; cls: number | null } = { lcp: null, fid: null, cls: null };

        // LCP 측정
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.startTime as number;
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        // CLS 측정
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value: number }; // LayoutShift
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
            }
          }
          vitals.cls = clsValue as number;
        }).observe({ type: 'layout-shift', buffered: true });

        // 3초 후 결과 반환
        setTimeout(() => {
          resolve(vitals);
        }, 3000);
      });
    });

    // Core Web Vitals 기준 검증
    if (webVitals.lcp) {
      expect(webVitals.lcp).toBeLessThan(2500); // Good LCP: < 2.5s
    }

    if (webVitals.cls !== null) {
      expect(webVitals.cls).toBeLessThan(0.1); // Good CLS: < 0.1
    }

    console.log('Core Web Vitals:', webVitals);
  });
});