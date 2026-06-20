import react from '@jchiam/eslint-config/react';

export default [
  { ignores: ['lib/**', 'coverage/**', 'test-results/**', 'playwright-report/**'] },
  ...react,
];
