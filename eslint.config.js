import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '.next', 'build', 'out']),

  // Reglas base JS
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser
    }
  },

  // TypeScript + React
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      globals: globals.browser
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    // Not using `extends` here because tseslint.configs.recommended
    // can contain nested `extends` which the config helper disallows.
    // We instead merge the recommended rules below.
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      ...tseslint.configs?.recommended?.rules
    }
  },

  // React Hooks + refresh plugin
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  // Integración con Prettier: desactivar reglas que chocan con Prettier
  {
    plugins: {
      prettier: prettierConfig
    },
    rules: {
      ...prettierConfig.rules
    }
  }
]);