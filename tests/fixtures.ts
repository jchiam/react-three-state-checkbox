import { test as ctTest, expect } from '@playwright/experimental-ct-react';
import { dumpCoverage } from './coverage';

export const test = ctTest.extend<{ collectCoverage: void }>({
  collectCoverage: [async ({ page }, use) => {
    await use();
    await dumpCoverage(page);
  }, { auto: true }],
});

export { expect };
