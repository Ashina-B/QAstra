import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import tsconfigs from '@typescript-eslint/eslint-plugin/configs'

export default [
  js.configs.recommended,
  ...tsconfigs.recommended,

  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.angular/**',
      '**/vite/**',
      '**/build/**',
      '**/.output/**',
      '**/coverage/**',
      '**/*.config.*',
      '**/env.d.ts',
      '**/index.html',
    ],
  },

  {
    files: ['frontend/**/*.ts', 'frontend/**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './frontend/tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  {
    files: ['backend/**/*.ts', 'backend/**/*.js'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './backend/tsconfig.json',
        sourceType: 'module',
      },
      ecmaVersion: 'latest',
      globals: {
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },
]
