// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [{
  ignores: [
    'node_modules',
    'src/generated/prisma/**',
  ],
},
...compat.extends('next/core-web-vitals', 'next/typescript'),
...storybook.configs['flat/recommended'],
{
  files: [
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/__tests__/**/*.ts',
    '**/__tests__/**/*.tsx',
    '**/*.stories.ts',
    '**/*.stories.tsx',
  ],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
      sourceType: 'module',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  }
}];

export default eslintConfig;
