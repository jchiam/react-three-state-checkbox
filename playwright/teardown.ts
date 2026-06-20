import { mergeCoverageReports } from '../tests/coverage';

function globalTeardown() {
  mergeCoverageReports();
}

export default globalTeardown;
