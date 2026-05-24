import recommended from '@jchiam/eslint-config/recommended.js';
import react from '@jchiam/eslint-config/react.js';

export default [
  { ignores: ['lib/**', 'coverage/**', 'test-results/**', 'playwright-report/**'] },
  ...recommended,
  ...react,
  {
    rules: {
      '@eslint-react/no-forward-ref': 'off',
    },
  },
];
