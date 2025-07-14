import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

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
      "**/index.html"
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
      // Optional: frontend-specific rules
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
    '@typescript-eslint/no-require-imports': 'off',
    'no-undef': 'off'
  }
}
];
