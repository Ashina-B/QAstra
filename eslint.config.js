import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,

  // Base config
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.angular/**",
      "**/vite/**",
      "**/build/**",
      "**/.output/**",
      "**/coverage/**",
      "**/*.config.*",
      "**/env.d.ts",
      "**/index.html",
      "**/eslint.config.js"
    ]
  },

  // Frontend config
  {
    files: ["frontend/**/*.ts", "frontend/**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./frontend/tsconfig.json",
        sourceType: "module"
      }
    },
    rules: {
      ...tseslint.configs.recommended.rules, 
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off'
    }
  },

  // Backend config
  {
  files: ['backend/**/*.js', 'backend/**/*.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      process: 'readonly',
      require: 'readonly',
      module: 'readonly',
      exports: 'readonly',
      console: 'readonly',
      __dirname: 'readonly',
    }
  },
  rules: {
    ...tseslint.configs.recommended.rules, 
    '@typescript-eslint/no-require-imports': 'off',
    'no-undef': 'off'
  }
}
];
