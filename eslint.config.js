import globals from 'globals';
import imports from 'eslint-plugin-import';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import security from 'eslint-plugin-security';
import svelte from 'eslint-plugin-svelte';
import ts from 'typescript-eslint';

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  imports.flatConfigs.recommended,
  security.configs.recommended,
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    rules: {
      'svelte/sort-attributes': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
        },
      ],
      'import/no-unresolved': 'off',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/'],
  },
);
