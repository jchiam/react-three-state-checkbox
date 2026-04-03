import recommended from '@jchiam/eslint-config/recommended.js';
import react from '@jchiam/eslint-config/react.js';
import jestPlugin from 'eslint-plugin-jest';

export default [
  { ignores: ['lib/**', 'coverage/**'] },
  ...recommended,
  ...react,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['tests/**/*.{ts,tsx,js}', '**/*.spec.{ts,tsx}'],
    ...jestPlugin.configs['flat/recommended'],
  },
];
