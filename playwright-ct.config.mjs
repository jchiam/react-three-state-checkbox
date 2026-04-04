import { defineConfig, devices } from '@playwright/experimental-ct-react';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  testDir: './tests',
  timeout: 10 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  globalTeardown: './playwright/teardown.ts',
  use: {
    ctPort: 3100,
    trace: 'on-first-retry',
    ctViteConfig: {
      plugins: [
        istanbul({
          include: ['src/**'],
          exclude: ['node_modules', 'tests/**'],
          extension: ['.ts', '.tsx'],
          requireEnv: false,
          forceBuildInstrument: true,
        }),
      ],
    },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
