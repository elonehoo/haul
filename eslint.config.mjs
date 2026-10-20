import babelParser from '@babel/eslint-parser'
import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    ignores: [
      'dist/**',
      'public/**',
      'coverage/**',
      'docs/.vitepress/cache/**',
      'pnpm-lock.yaml',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          parserOpts: {
            plugins: ['typescript'],
          },
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        fetchMock: 'readonly',
      },
    },
    rules: {
      // Babel's ESLint parser does not understand TypeScript types, so these
      // rules flag type positions. `tsc` already checks unused locals.
      // typescript-eslint cannot parse TypeScript 7, which has no compiler API.
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
]
