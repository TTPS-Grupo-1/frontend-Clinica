import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tailwindcss from 'eslint-plugin-tailwindcss';
import { defineConfig, globalIgnores } from 'eslint/config';
import js from 'eslint/conf/eslint-all';
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
      parser: '@typescript-eslint/parser',
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
    extends: [
      // Nota: `recommended` de tseslint contiene reglas útiles
      'plugin:@typescript-eslint/recommended'
    ],
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
      'react-refresh': reactRefresh,
      'tailwindcss': tailwindcss
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Reglas del plugin tailwind (warn para evitar interrupciones)
      'tailwindcss/classnames-order': 'warn'
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