import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import libCoverage from 'istanbul-lib-coverage';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';

async function globalTeardown() {
  if (!existsSync('.nyc_output')) return;

  const coverageMap = libCoverage.createCoverageMap({});

  for (const file of readdirSync('.nyc_output').filter(f => f.endsWith('.json'))) {
    const data = JSON.parse(readFileSync(join('.nyc_output', file), 'utf-8'));
    coverageMap.merge(data);
  }

  const context = libReport.createContext({ dir: 'coverage', coverageMap });
  reports.create('lcov').execute(context);
  reports.create('text').execute(context);
}

export default globalTeardown;
