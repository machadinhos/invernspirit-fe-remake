import globals from 'globals';
import imports from 'eslint-plugin-import';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import ts from 'typescript-eslint';

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    plugins: {
      import: imports,
    },
    rules: {
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
        },
      ],
      eqeqeq: 'error',
      camelcase: 'error',
      'no-unneeded-ternary': 'error',
      'no-var': 'error',
      'require-await': 'error',
      'prefer-template': 'error',
      'no-implicit-coercion': 'error',
      'dot-notation': 'error',
      'svelte/no-useless-mustaches': 'error',
      'svelte/no-inspect': 'error',
      'svelte/no-at-debug-tags': 'error',
      'svelte/button-has-type': 'error',
      'svelte/sort-attributes': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
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
