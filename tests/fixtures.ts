import { test as ctTest, expect } from '@playwright/experimental-ct-react';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export const test = ctTest.extend<{ collectCoverage: void }>({
  collectCoverage: [async ({ page }, use) => {
    await use();
    const coverage = await page.evaluate(() => (window as Window & { __coverage__?: unknown }).__coverage__ ?? null);
    if (coverage) {
      mkdirSync('.nyc_output', { recursive: true });
      const filename = `coverage-${Date.now()}-${Math.random().toString(36).slice(2)}.json`;
      writeFileSync(join('.nyc_output', filename), JSON.stringify(coverage));
    }
  }, { auto: true }],
});

export { expect };
