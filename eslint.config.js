import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

let tsEslintPlugin = null;
let tsParser = null;

try {
  tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
  tsParser = require('@typescript-eslint/parser');
} catch {
  // This package currently does not declare @typescript-eslint dependencies.
  // When they are added, the TS override below will start applying automatically.
}

const reactRules = {
  ...reactPlugin.configs.recommended.rules,
  ...reactPlugin.configs['jsx-runtime'].rules,
  ...reactHooks.configs.recommended.rules,
  'react/prop-types': 'off',
};

export default [
  {
    ignores: [
      'coverage/**',
      'dist/**',
      'node_modules/**',
      'storybook-static/**',
    ],
  },
  {
    ...js.configs.recommended,
    files: ['**/*.{js,mjs,cjs}'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactRules,
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  ...(tsEslintPlugin && tsParser
    ? [
        {
          files: ['**/*.{ts,tsx}'],
          languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
              ecmaFeatures: {
                jsx: true,
              },
            },
          },
          plugins: {
            '@typescript-eslint': tsEslintPlugin,
            react: reactPlugin,
            'react-hooks': reactHooks,
          },
          settings: {
            react: {
              version: 'detect',
            },
          },
          rules: {
            ...reactRules,
            ...tsEslintPlugin.configs.recommended.rules,
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
              'warn',
              {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
              },
            ],
          },
        },
      ]
    : [
        {
          ignores: ['**/*.{ts,tsx}'],
        },
      ]),
];
