import type { Linter } from 'eslint';

const recommended: Linter.Config = {
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['jest', 'react', '@typescript-eslint', 'fleet-lint'],
  env: {
    node: true,
    mocha: true,
    browser: true,
    'jest/globals': true,
  },
  globals: {
    expect: 'readonly',
    describe: 'readonly',
  },
  rules: {
    camelcase: 'off',
    'consistent-return': 1,
    'arrow-body-style': 0,
    'max-len': 0,
    'no-unused-expressions': 0,
    'no-console': 0,
    'space-before-function-paren': 0,
    'react/prefer-stateless-function': 0,
    'react/no-multi-comp': 0,
    'react/no-unused-prop-types': [
      1,
      {
        customValidators: [],
        skipShapeProps: true,
      },
    ],
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react-hooks/exhaustive-deps': 1,
    'no-param-reassign': 0,
    'new-cap': 0,
    'import/no-unresolved': [
      2,
      {
        caseSensitive: false,
      },
    ],
    'linebreak-style': 0,
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'fleet-lint/node-modules-first': 'error',
    'fleet-lint/project-import-order': 'error',
  },
  overrides: [],
  settings: {
  },

};

export default recommended;
