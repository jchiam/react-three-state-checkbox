import type { Page } from 'playwright-core';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import libCoverage from 'istanbul-lib-coverage';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';

// The seam for the whole coverage pipeline. Both the per-test fixture and the
// global teardown go through this module, so the .nyc_output contract and the
// window.__coverage__ global (set by vite-plugin-istanbul) are written down
// exactly once each. The only firing points left outside are the istanbul
// instrument step in playwright-ct.config.mjs and the `rm -rf .nyc_output` in
// package.json's test script — neither can import this module.
const OUTPUT_DIR = '.nyc_output';
const REPORT_DIR = 'coverage';

// Pull window.__coverage__ off the page and persist it as one file per test,
// for the global teardown to merge. No-op when instrumentation is absent.
export async function dumpCoverage(page: Page): Promise<void> {
  const coverage = await page.evaluate(
    () => (window as Window & { __coverage__?: unknown }).__coverage__ ?? null,
  );
  if (!coverage) return;

  mkdirSync(OUTPUT_DIR, { recursive: true });
  const filename = `coverage-${Date.now()}-${Math.random().toString(36).slice(2)}.json`;
  writeFileSync(join(OUTPUT_DIR, filename), JSON.stringify(coverage));
}

// Merge every per-test dump into one coverage map and emit lcov + text reports.
export function mergeCoverageReports(): void {
  if (!existsSync(OUTPUT_DIR)) return;

  const coverageMap = libCoverage.createCoverageMap({});
  for (const file of readdirSync(OUTPUT_DIR).filter((f) => f.endsWith('.json'))) {
    coverageMap.merge(JSON.parse(readFileSync(join(OUTPUT_DIR, file), 'utf-8')));
  }

  const context = libReport.createContext({ dir: REPORT_DIR, coverageMap });
  reports.create('lcov').execute(context);
  reports.create('text').execute(context);
}
