import { expect, test } from "@playwright/test";

test("the local demo works in English and Spanish without off-site requests", async ({ page, baseURL }) => {
  const allowedOrigin = new URL(baseURL!).origin;
  const offSiteRequests: string[] = [];

  await page.route("**/*", async (route) => {
    const requestUrl = new URL(route.request().url());
    if (requestUrl.origin === allowedOrigin || requestUrl.protocol === "data:") {
      await route.continue();
      return;
    }
    offSiteRequests.push(requestUrl.origin);
    await route.abort();
  });

  await page.addInitScript((origin) => {
    const allowed = new Set([origin]);
    const report = (rawUrl: string) => {
      const target = new URL(rawUrl, window.location.href);
      if (!allowed.has(target.origin)) {
        (window as Window & { __networkViolations?: string[] }).__networkViolations ??= [];
        (window as Window & { __networkViolations?: string[] }).__networkViolations!.push(target.origin);
        throw new TypeError("Blocked off-site request: " + target.origin);
      }
    };

    const nativeFetch = window.fetch.bind(window);
    window.fetch = (input, init) => {
      report(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
      return nativeFetch(input, init);
    };

    const NativeXHR = window.XMLHttpRequest;
    class GuardedXHR extends NativeXHR {
      override open(method: string, url: string | URL, async?: boolean, username?: string | null, password?: string | null): void {
        report(String(url));
        if (async === undefined) super.open(method, url);
        else super.open(method, url, async, username, password);
      }
    }
    window.XMLHttpRequest = GuardedXHR;

    const NativeSocket = window.WebSocket;
    window.WebSocket = new Proxy(NativeSocket, {
      construct(target, args: [url: string | URL, protocols?: string | string[]]) {
        report(String(args[0]));
        return Reflect.construct(target, args);
      },
    });

    const NativeEventSource = window.EventSource;
    window.EventSource = new Proxy(NativeEventSource, {
      construct(target, args: [url: string | URL, options?: EventSourceInit]) {
        report(String(args[0]));
        return Reflect.construct(target, args);
      },
    });
  }, allowedOrigin);

  await page.goto("/");
  await expect(page.getByRole("heading", { name: /see a place/i })).toBeVisible();

  await page.getByRole("button", { name: /place your pin/i }).click({ position: { x: 185, y: 90 } });
  await expect(page.getByRole("button", { name: /reveal the place/i })).toBeEnabled();
  const eastSlider = page.getByRole("slider", { name: /move east/i });
  await eastSlider.focus();
  await eastSlider.press("ArrowRight");
  await page.getByRole("button", { name: /reveal the place/i }).click();
  await expect(page.getByRole("heading", { name: /sunward coast/i })).toBeVisible();
  await expect(page.getByText("842")).toBeVisible();

  await page.getByRole("button", { name: /try another scene/i }).click();
  await expect(page.locator("[data-scene-number]")).toHaveText("02");
  await page.getByRole("button", { name: "Cambiar idioma a español" }).click();
  await expect(page.getByRole("heading", { name: /mira un lugar/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /¿dónde pondrías el pin/i })).toBeVisible();
  await expect(page.getByRole("group", { name: /ajusta la posición/i })).toBeVisible();
  await page.setViewportSize({ width: 320, height: 740 });
  const fitsNarrowMobile = await page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
  );
  expect(fitsNarrowMobile).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  const fitsMobile = await page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
  );
  expect(fitsMobile).toBe(true);

  const pageViolations = await page.evaluate(
    () => (window as Window & { __networkViolations?: string[] }).__networkViolations ?? [],
  );
  expect(offSiteRequests).toEqual([]);
  expect(pageViolations).toEqual([]);
});
